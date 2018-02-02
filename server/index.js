"use strict";

// Basic express setup:
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB set up
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// MongoDB connection set up with database
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error('Error with data entry');
    return;
  }
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
});

// Console log server listening port
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});