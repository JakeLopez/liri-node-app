//This application will allow the user to take node inputs and output information from twitter, spotify and omdb

//---------------Twitter---------------//
// This is requre the node module "twitter"
var Twitter = require('twitter');
var keys = require('./keys.js')
var inquirer = require("inquirer");
var request = require("request");

var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
});


inquirer.prompt([

    {
        type: "checkbox",
        name: "userChoice",
        message: "What would you like to do?",
        choices: ["my tweets", "spotify a song", "search a movie", "something else"]
    }

]).then(function(user) {
    if (user.userChoice == "my tweets") {

        var params = { screen_name: 'jcode222' };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {

                for (var i = 0; i < tweets.length; i++) {
                    console.log("\ntweets: " + tweets[i].text + "\ncreated on: " + tweets[i].created_at);
                }

            }
        });

    }

});




//---------------OMDB---------------//
