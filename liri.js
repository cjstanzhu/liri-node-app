require("dotenv").config();

let keys = require("./keys.js");
let axios = require("axios");

// let spotify = new Spotify(keys.spotify); //access your keys information

let command = process.argv[2];
let userInput = process.argv[3]; //for now... need to concatenate

switch (command) {
    case "concert-this":
        getConcert();
        break;
    
    case "spotify-this-song":
    
        break;
    
    case "movie-this":
        getMovie();
        break;
    
    case "do-what-it-says":
    
        break;
    default:
        console.log("Please enter a valid command.");
};

function getConcert() {
    let queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function(response) {
        console.log(response.data.length);

        if (response.data.length < 9) {
            for (let i = 0; i < response.data.length; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date: " + response.data[i].datetime); //need to reformat with moment.js
                console.log(" ");
            };
        } else {
            for (let i = 0; i < 8; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date: " + response.data[i].datetime); //need to reformat with moment.js
                console.log(" ");
            };
        };

    }).catch(function(error) {
        console.log(error);
    });
};

function getMovie() {
    let queryURL = "http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy";

    axios.get(queryURL).then(function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Release year: " + response.data.Year);
        console.log("IMDB rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);

    }).catch(function(error) {
        console.log(error);
    });
};


