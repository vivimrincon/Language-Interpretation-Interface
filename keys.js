console.log('keys.js has loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
  content: process.env.CONTENT,
  token: process.env.AUTHO,
};
/* This file will be used by the 'dotenv' package to set what are known as environment variables to the global 'process.env' object in node.
These are values that are meant to be specific to the computer that node is running on, 
and since we are gitignoring this file, they won't be pushed to github — keeping our API key information private. */

/* process.env is a property that returns an object containing the user environment.
Assigning a property on process.env will implicitly convert the value to a string.
https://nodejs.org/api/process.html#process_process_env
*/