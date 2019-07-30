require("dotenv").config();

let keys = require("./keys.js");
let axios = require("axios");
let Spotify = require("node-spotify-api");
let fs = require("fs");
let moment = require("moment");

let spotify = new Spotify(keys.spotify); //access your keys information

let nodeArgs = process.argv;
let command = process.argv[2];
let userInput = "";

for (let i = 3; i < nodeArgs.length; i++) {
    if (i > 3) {
        userInput = userInput + " " + nodeArgs[i];
    } else {
        userInput += nodeArgs[i];
    };
};

liriBot(command);

function liriBot(command) {
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
            getCommand();
            break;

        default:
            console.log("Please enter a valid command.");
    };
};

function getConcert() {
    if (userInput === "") {
        console.log("Please enter an artist name.");
    } else {
        let queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

        axios.get(queryURL).then(function(response) {
            // console.log(response.data.length);

            if (response.data.length === 0) {
                console.log("No upcoming concerts/events scheduled.");
            } else {
                for (let i = 0; i < 8 && i < response.data.length; i++) {
                    let dateArray = response.data[i].datetime.split("T");
                    dateConverted = moment(dateArray[0], "YYYY-MM-DD").format("MM/DD/YYYY");
                    // console.log(dateConverted);

                    console.log(" ");
                    console.log("Venue: " + response.data[i].venue.name);
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log("Date: " + dateConverted);
                };
            };

        }).catch(function(error) {
            console.log(error);
        });
    };
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
        for (let i = 0; i < response.tracks.items.length; i++) {
            if (userInput) {
                console.log(" ");
                console.log("Artist(s): " + response.tracks.items[i].artists[0].name);
                console.log("Song name: " + response.tracks.items[i].name);
                console.log("Preview link(1): " + response.tracks.items[i].external_urls.spotify);
                console.log("Preview link(2): " + response.tracks.items[i].preview_url);
                console.log("Album: " + response.tracks.items[i].album.name);
            } else {
                if (response.tracks.items[i].artists[0].name === "Ace of Base") {
                    console.log(" ");
                    console.log("Artist(s): " + response.tracks.items[i].artists[0].name);
                    console.log("Song name: " + response.tracks.items[i].name);
                    console.log("Preview link(1): " + response.tracks.items[i].external_urls.spotify);
                    console.log("Preview link(2): " + response.tracks.items[i].preview_url);
                    console.log("Album: " + response.tracks.items[i].album.name);
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
        console.log(" ");
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

function getCommand() {
    fs.readFile("./random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        };

        let dataArray = data.split(",");
        // console.log(dataArray);

        command = dataArray[0];
        userInput = dataArray[1];

        liriBot(command);
    });
};

