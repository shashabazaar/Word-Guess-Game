/requiring the .env

require("dotenv").config();

//requiring the keys.js file
var keys = require("./keys.js");


//modules that will be called
var fs = require("fs");
var request = require("request");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//variables for each command

//add split to each
var command = process.argv[2];
var commandName = process.argv[3];


//change these to ELSE/SWITCH

function switchCase(command, commandName) {

 switch (command) {

   case "concertthis":
     concertthis(commandName);
     break;

   case "spotifythis":
     spotifythis(commandName);
     break;

   case "dowhatitsays":
     dowhatitsays(commandName);
     break;

   case "moviethis":
     moviethis(commandName);

   default:
     console.log(`Commands are: spotifythis, concerthis, spotifythis, dowhatitsays`);
 }

};

//function for concertThis
function concertthis(artist) {
 console.log(artist);
 // var artist = "";
 artist = artist || "Ariana Grande"
 const queryLink = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

 request(queryLink, function (err, response, body) {

   if (body === [], function (err) {
     console.log(err);
   });

   for (var i = 0; i < JSON.parse(body).length; i++) {

     var venue = JSON.parse(body)[i].venue;
     var date = JSON.parse(body)[i].date;
     var formattedDate = moment(date).format("MM/DD/YYYY");

     var venueName = venue.name;
     var venueRegion = venue.region;
     var venueCountry = venue.country;
     var venueCity = venue.city;

     console.log(`
     ---------------------------
     Name: ${venueName}
     City: ${venueCity}
     Region: ${venueRegion}
     Country: ${venueCountry}
     Date: ${formattedDate}
     ---------------------------
     `);
   }

 })

};

function spotifythis(songName) {


 spotify.search({ type: 'track', query: songName }, function (err, data) {
   if (err) {
     return console.log('Error occurred: ' + err);
   }

   var songs = data.tracks.items;
   for (var i = 0; i < songs.length; i++) {
     var artists = songs[i].artists.map(function (artist) {
       return artist.name;
     });

     var name = songs[i].name;
     var album = songs[i].album.name;
     var previewLink = songs[i].preview_url;

     console.log(`
       ---------------------------
       Name: ${name}
       Album: ${album}
       Artists: ${artists}
       Link: ${previewLink}
       ---------------------------
       `);
   }



 });

};


function dowhatitsays() {

 fs.readFile("random.txt", "utf8", function (error, data) {
   if (error) {
     return console.log(error)
   } else {


     var dataArr = data.split(",");

     // We will then re-display the content as an array for later use.
     console.log(dataArr[0]);

     switchCase(dataArr[0], dataArr[1])
   }
 });
};


//function for movies
function moviethis(movie) {

 movie = movie || "The Dark Knight";
 const queryLink = "http://www.omdbapi.com/?apikey=eb60dced&t=" + movie;

 request(queryLink, function (err, response, body) {

   const movieData = JSON.parse(body);

   console.log(`
--------------------
Title: ${movieData.Title}
Year: ${movieData.Year}
Released: ${movieData.Released}
IMDB Rating: ${movieData.Ratings[0].Value}
RT Rating: ${movieData.Ratings[1].Value}
Metacritic Rating: ${movieData.Ratings[2].Value}
Where was it made: ${movieData.Country}
Languages Available: ${movieData.Language}
Plot: ${movieData.Plot}
Cast: ${movieData.Actors}
   `);
 })
};

switchCase(command, commandName);