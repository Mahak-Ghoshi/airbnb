const { ref } = require('joi');
const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const Review= require("./review.js");
// const { listingSchema } = require('../schema.js');

const sampleSchema= new Schema({
    title:{
        type: String,
        required:true
    },

    description:{
    } ,
    // image:{
    //             type:String,

    //     default: "https://unsplash.com/photos/bowl-of-vegetable-salads-IGfIGP5ONV0",
    //     set :(v)=> v===""? "https://unsplash.com/photos/bowl-of-vegetable-salads-IGfIGP5ONV0" :v
    //  },
     image: {
            url: String,

    filename: String,
  },
     price: Number,
     location: String,
     country: String,
     reviews: [{
type: Schema.Types.ObjectId,
ref:"Review"
     }],

     owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
     },
     geometry: {
         type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

sampleSchema.post("findOneAndDelete", async(listing)=> {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }

})

const Listing= mongoose.model("Listing", sampleSchema);
module.exports=Listing;