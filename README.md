# LIRI Bot

## Description

LIRI (Language Interpretation and Recognition Interface) Bot is a command line node application that takes in command parameters and returns and displays requested data. Users are able to enter commands that return information for specific movies, song titles, and upcoming artist event/concert schedules.

### Technologies Used

LIRI will search the [OMDB (Open Movie Database) API](http://www.omdbapi.com) for movies, the [Bands in Town API](https://www.artists.bandsintown.com) for artist event/concert schedules, and the [Spotify API](https://developer.spotify.com) for songs.

Important Node packages:

* [Axios](https://www.npmjs.com/package/axios)
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [Moment](https://www.npmjs.com/package/moment)

## LIRI Commands

1. `node liri.js movie-this <movie name here>`

Users can enter a movie name and information regarding the movie will be displayed:

```
    * Title of the movie.
    * Year the movie was released.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
```

![movie-this example](./)

If the user doesn't input a movie name, the application will output data for the movie "Mr. Nobody."

![movie-this example no name](./)

2. `node liri.js concert-this <artist/band name here>`

Users can enter an artist/band name and information regarding their next (up to) 8 event/concert schedules will be displayed:

```
    * Name of the venue.
    * Venue location.
    * Date of the event.
```

![concert-this example](./)

3. `node liri.js spotify-this-song <song name here>`

Users can enter a song name and up to 8 entries matching the song name will be displayed:

```
    * Artist(s).
    * Song name.
    * Preview link of the song.
    * Album information.
```

![spotify-this-song example](./)

If the user doesn't input a song name, the application will output data for the song "The Sign" by Ace of Base.

![spotify-this-song example no name](./)

4. `node liri.js do-what-it-says`

Users also have a bonus option to let LIRI read the random.txt file associated with the application to dictate its action.

![do-what-it-says example](./)

## Contributor

Stanley Zhu - Developer


