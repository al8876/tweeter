"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Function to save composed tweets to MongoDB database
    saveTweet: function(newTweet, callback) {
      try {
        db.collection("tweets").insertOne(newTweet);
        callback(null);
      } catch(err) {
        callback(err);
      }
    },

    // Function to retrive tweets from MongoDB and display tweets on homepage
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          console.log("Error loading tweets");
          return callback(err);
        }
        console.log("Tweet loaded");
        callback(null, tweets);
      });
    }
  };
};