const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/avas";

main()
    .then(() => {
        console.log("Connected To Database Successfully ✅");
    }).catch((error) => {
        console.log("Error: ", error);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await listing.deleteMany({});
    initData.data  = initData.data.map((obj) => ({...obj, owner: "68206e5a3a32038074ee4172"}))
    await listing.insertMany(initData.data);
    console.log("Data Was Initialized!");
}

initDB();