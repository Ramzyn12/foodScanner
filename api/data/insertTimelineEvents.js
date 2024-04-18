// populateDB.js
require('dotenv').config();
const mongoose = require('mongoose');
const { timelineData } = require('./TimelineEventsData');
const TimelineWeek = require('../models/TimelineWeek');
// Your MongoDB connection string

mongoose.connect('mongodb+srv://ramzynanou02:Ramzy2002.123@cluster0.nxdxz07.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


const populateData = async () => {
    try {
        await TimelineWeek.deleteMany({}); // Optional: Clear the collection before inserting
        await TimelineWeek.insertMany(timelineData);
        console.log('Data successfully inserted');
    } catch (err) {
        console.error('Error inserting data', err);
    } finally {
        mongoose.connection.close();
    }
};

populateData();