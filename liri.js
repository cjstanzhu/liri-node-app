require("dotenv").config();

let keys = require("./keys.js");
let axios = require("axios");
let Spotify = require("node-spotify-api");

let spotify = new Spotify(keys.spotify); //access your keys information

let command = process.argv[2];
let userInput = process.argv[3]; //for now... need to concatenate

switch (command) {
    case "concert-this":
        getConcert();
        break;
    
    case "spotify-this-song":
        getSong();
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

        //try i < response.data.length && i < 8
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

function getSong() {
    let songName = "";

    if (userInput) {
        songName = userInput;
    } else {
        songName = "the sign";
    };

    spotify.search({
        type: "track",
        query: songName,
        limit: 8
    }).then(function(response) {
        // console.log(response.tracks.items.length);
        // console.log(response.tracks.items[0]);

        for (let i = 0; i < response.tracks.items.length; i++) {
            if (userInput) {
                console.log("Artist(s): " + response.tracks.items[i].artists[0].name);
                console.log("Song name: " + response.tracks.items[i].name);
                console.log("Preview link(1): " + response.tracks.items[i].preview_url);
                console.log("Preview link(2): " + response.tracks.items[i].external_urls.spotify);
                console.log("Album: " + response.tracks.items[i].album.name);
                console.log(" ");
            } else {
                if (response.tracks.items[i].artists[0].name === "Ace of Base") {
                    console.log("Artist(s): " + response.tracks.items[i].artists[0].name);
                    console.log("Song name: " + response.tracks.items[i].name);
                    console.log("Preview link(1): " + response.tracks.items[i].preview_url);
                    console.log("Preview link(2): " + response.tracks.items[i].external_urls.spotify);
                    console.log("Album: " + response.tracks.items[i].album.name);
                    console.log(" ");
                };
            };
        };

    }).catch(function(error) {
        console.log(error);
    });

};

function getMovie() {
    let movieName = "";

    if (userInput) {
        movieName = userInput;
    } else {
        movieName = "mr.nobody";
    };

    let queryURL = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

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


