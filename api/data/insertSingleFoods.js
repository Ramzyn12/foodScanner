// populateDB.js
require('dotenv').config();
const mongoose = require('mongoose');
const SingleFood = require('../models/SingleFood');
const { singleFoodsData } = require('./singleFoodsData');
// Your MongoDB connection string

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


const populateData = async () => {
    try {
        await SingleFood.deleteMany({}); // Optional: Clear the collection before inserting
        await SingleFood.insertMany(singleFoodsData);
        console.log('Data successfully inserted');
    } catch (err) {
        console.error('Error inserting data', err);
    } finally {
        mongoose.connection.close();
    }
};

populateData();