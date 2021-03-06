"use strict";

// Basic express setup:
const PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// SASS setup:
const nodeSassMiddleware = require("node-sass-middleware");
const path = require("path");

// SASS middleware setup:
app.use(nodeSassMiddleware({
  src: path.join(__dirname, '../sass'),
  dest: path.join(__dirname, '../public/styles'),
  debug: true,
  outputStyle: 'compressed'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB setup:
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://heroku_3l7w49m0:bkg01ei0uofnk4nchvirbn01ue@ds223738.mlab.com:23738/heroku_3l7w49m0";

// MongoDB connection set up with database:
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error('Error with data entry');
    return;
  }
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);
});

// Console log server listening port:
app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
