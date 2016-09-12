# Twitter Game

This a simple application made with Node.JS, Socket.io, Piwi.js and twit.js for showcase purposes. It fetches twitter posts matching any of the hashtags in a (hard-coded) configuration file. It should also fetch new posts in real time, although this functionality may not work. Clicking on a post makes it disappear and increments the on-screen score.

## How to run it

The following steps are necessary to run this application:

* Install node.js and npm
* Install the following dependencies with npm:
    * socket.io ~1.4.8
    * pixi.js: ~4.0.1
    * twit: ~2.2.4
* Install `browserify`
* Edit the `hashtag_list.js` file and add/remove the hashtags of your choosing
* Edit the `twitter_keys.js` file and add your own keys
    * NOTE: These keys should not be commited and pushed upstream; if you do commit this file, I recommend resetting your keys on your twitter account
* Run browserify: `browserify main.js >build.js`
* Start a server: `node server.js`
* Open `main.html` is your browser
* You're done!

## Twitter keys

The server part of this application needs twitter keys to work. To get a new set of keys, go to apps.twitter.com, select `Create new app` and fill out the fields. Once you're on your new app's page, go to the `Keys and Access Tokens` tab, and copy-paste the appropriate fields into the `twitter_keys.js` file.
