/*
** The part tying all client-side code together
** Should be used as the target of browserify
**
** $>> browserify main.js >build.js
**
*/

let io = require("socket.io-client");
let canvas = require("./canvas");
let hashtags = require("./hashtag_list").list;

let socket = io.connect('http://localhost:8042')
    .on("connect", function () {
        socket.emit("hashtags", hashtags);
    })
    .on('new_tweet', function(userName, content) {
        canvas.addTweet(userName, content);
        canvas.render();
    });
