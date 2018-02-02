"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    // saveTweet: function(newTweet, callback) {
    //   simulateDelay(() => {
    //     db.tweets.push(newTweet);
    //     callback(null, true);
    //   });
    // },

    saveTweet: function(newTweet, callback) {
      try {
        db.collection("tweets").insertOne(newTweet);
        callback(null);
      } catch(err) {
        callback(err);
      }
    },

    // Get all tweets in `db`, sorted by newest first
    // getTweets: function(callback) {
    //   simulateDelay(() => {
    //     const sortNewestFirst = (a, b) => a.created_at - b.created_at;

    //     callback(null, db.tweets.sort(sortNewestFirst));
    //   });
    // }

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
