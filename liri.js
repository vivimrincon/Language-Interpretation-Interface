require('dotenv').config();
const Spotify = require('node-spotify-api'); //import spotify api
const keys = require('./keys.js'); //import API keys
const axios = require('axios'); //import axios
const moment = require('moment'); //import moment.js
const fs = require('fs'); // import module to read/write files
let spotify = new Spotify (keys.spotify);

let log = console.log;

const argument1 = process.argv[2]; //switch statement
const argument2 = process.argv.slice(3).join(" ");

log("arg-1 is...", argument1);
log("arg-2 is...", argument2);

// First Switch Statement
function getMyConcert(artist) {

    const url = 'https://rest.bandsintown.com/artists/' + artist +'/events?';
    axios.get(url, {
        params: {
            app_id: 'codingbootcamp'
        }
    })
    .then((response) => {
        let x = response.data;
        log(response.data);
    })
    .catch((err) => {
        log(err);
    })

    for (let i = 0; i < x.length; i++) {
        let show = __[i];
        log( show.venue.city +
            "," + 
            (show.venue.region || show.venue.country) + 
            "at" + 
            show.venue.name + " " + 
            moment(show.datetime).format("MM/DD/YYYY")
        );
    }
};

// Second Switch Statement
function getMySong(song) {
    spotify.search({type: 'track', query: song, limit: 2}, function(err, data) {
        if(err) {
            log('Search Error Occurred-1011001: ' + err);
            return;
        }
        //log("spot-data", data);
        
        let songInfo = data.tracks.items;
        //log("songinfostatic: ", songInfo);
        for (var i = 0; i < songInfo.length; i++) {
            log("songinfo-in-for-loop",i); // 0 or 1
            //log("artist: " + songsInfo[i].artists.map(getArtistNames)); //??
            log("song-name-in-for-loop: " + songInfo[i].name);
            log("album-in-for-loop: " + songInfo[i].album.release_date);
            log("external-link-for-loop", songInfo[i].external_urls.href);
        }
    })
};

// Third Switch Statement
function getMyMovie(cinema) {
    const mURL = 'http://www.omdbapi.com/?t='+ cinema +'&apikey=4ca1e2d5&type=movie';
    axios.get(mURL)
    .then((res)=>{
        let mInfo = res.data;
        log("Title of the movie:", mInfo.Title);
        log("Year the movie released:", mInfo.Year);
        log("IMDB movie rating:", mInfo.imdbRating);
        log("Rotten Tomatoes movie rating:", mInfo.Ratings[1].Value);
        log("Country where the movie was produced:", mInfo.Country);
        log("Movie Language:", mInfo.Language);
        log("Movie Plot:", mInfo.Plot);
        log("Actors in the Movie:", mInfo.Actors);
    })
    .catch((err)=>{
        log('Movie Error#1:', err);
    });  
};

function doWhatItSays() {
    fs.readFile("random.txt", "UTF-8", function(err, data){
        log('dhtsdata', data);
        let darray = data.split(",");
        log(darray); //[ 'movie-this', ' The Matrix' ]
        
        if (darray.length === 2) {
            readcall(darray[0],darray[1]);
        }
        else if(darray.length === 1) {
            readcall(darray[0]);
        }
    });
};
function readcall(argument1,argument2) {
    switch (argument1) {
        case 'concert-this':
            log('concert-this is being read in through the switch');
            getMyConcert(argument2); // Passing arguments value into artist param
            break;
        case 'spotify-this-song':
            log('spotify-this-song is being read through the switch.');
            getMySong(argument2); // Passing argument value into song param
            break;
        case 'movie-this':
            log('movie-this is being read through the switch');
            getMyMovie(argument2); //passing agrument2 value into the ciname param
            break;
        case 'do-what-it-says':
            log('do-what-it-says is being read through the switch');
            doWhatItSays();
            break;
        default:
            log('No argument was made, try again.')
            break;
    }
}
readcall(argument1, argument2);