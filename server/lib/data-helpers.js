"use strict";

// Simulates the kind of delay we see with network or filesystem operations
//const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insert(newTweet);
      // db.tweets[0].push(newTweet);
      // console.log(newTweet);
      // console.log('db.tweets', db);
      callback(null, true);

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function (callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) throw err;

        // let obj = tweets[0].tweets;
        // console.log(obj);
        // console.log("Logging each tweet:");;
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets[0].tweets.sort(sortNewestFirst));

      });
    }
  }
};