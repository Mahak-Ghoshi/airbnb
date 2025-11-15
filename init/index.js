const mongoose = require('mongoose');
const initData= require("./data.js");
// const listing= require("./models/listing.js");
const Listing = require('../models/listing');
const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust'
main()
.then((res) =>{
    console.log("connected to db")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);

}

const initDB =async() => {
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=> ({
      ...obj, owner:'690580a8a2d9271f29854cb8'
    }));
    await Listing.insertMany(initData.data)
    console.log("data is initit...")
}
initDB();