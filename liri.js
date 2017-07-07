//This application will allow the user to take node inputs and output information from twitter, spotify and omdb


// This is requre the node module "twitter"
var Twitter = require('twitter');
var keys = require('./keys.js')
var inquirer = require("inquirer");
var request = require("request");
var Spotify = require('node-spotify-api');
var nodeArgs = process.argv;

var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
});
var spotify = new Spotify({
    id: keys.spotifykeys.client_id,
    secret: keys.spotifykeys.client_secret
});

inquirer.prompt([
    {
        type: "checkbox",
        name: "userChoice",
        message: "What would you like to do?",
        choices: ["my tweets", "spotify a song", "search a movie", "something else"]
    }
]).then(function(user) {
    //---------------Twitter---------------//

    if (user.userChoice == "my tweets") {
        

        var params = { screen_name: 'jcode222' };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {

                for (var i = 0; i < tweets.length; i++) {
                    console.log("\ntweets: " + tweets[i].text + "\ncreated on: " + tweets[i].created_at);
                }
            }
        });

    };
    //---------------Spotify---------------//
    

    // var spotifyQuery =; 

    //     else if (user.userChoice == "spotify a song") {
    //     spotify.search({ type: 'track', query:  }, function(err, data) {
    //         if (err) {
    //             return console.log('Error occurred: ' + err);
    //         }

    //         console.log(data);
    //     });
    // };
//     //---------------OMDB---------------//
    if (user.userChoice == "search a movie") {
    
    inquirer.prompt([
    {
        type: "input",
        name: "movieSearch",
        message: "What movie would you like to search?",
        
    }
]).then(function(user) {
   var movieName = user.movieSearch;
    console.log("you searched " + user.movieSearch);
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
     
        request(queryUrl, function(error, response, body) {

  // If the request is successful
            if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                console.log("Release Year: " + JSON.parse(body).Year);
  }
});



    });
    };
    });








