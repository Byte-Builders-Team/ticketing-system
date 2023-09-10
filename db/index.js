// Import the "mongoose" library into this JavaScript file.
const mongoose = require("mongoose");

// Connect to a MongoDB database named "ticketing-system-db" on your local computer.
mongoose.connect("mongodb://127.0.0.1:27017/ticketing-system-db", {
  useNewUrlParser: true, // Use the new URL parser.
  useUnifiedTopology: true, // Use the latest server monitoring engine.
});

// Create a variable "db" to represent the MongoDB database connection.
const db = mongoose.connection;

// Listen for any errors in the database connection and log them to the console.
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Once the connection is successfully established, log a confirmation message.
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Export the MongoDB database connection so other parts of the program can use it.
module.exports = db;