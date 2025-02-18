const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDB Server")
})

db.on('error', () => {
    console.log("Failed to connect to MongoDB Server")
})

db.on("disconnected", () => {
    console.log("MongoDB connection disconnected")
})

module.exports = db;