require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// connect DB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

async function fixOldListings() {
    const listings = await Listing.find({ "geometry": { $exists: false } });

    console.log(`Found ${listings.length} listings without geometry.`);

    for (let listing of listings) {

        if (!listing.location) {
            console.log(`Skipping listing without location: ${listing._id}`);
            continue;
        }

        try {
            const geoRes = await geocodingClient.forwardGeocode({
                query: listing.location,
                limit: 1
            }).send();

            const geometry = geoRes.body.features[0]?.geometry;

            if (!geometry) {
                console.log(`No geometry found for: ${listing.location}`);
                continue;
            }

            listing.geometry = geometry;
            await listing.save();

            console.log(`✔ Updated: ${listing.title} (${listing.location})`);
            
        } catch (err) {
            console.log(`❌ Error with listing ${listing._id}:`, err);
        }
    }

    console.log("All old listings updated.");
    mongoose.connection.close();
}

fixOldListings();
