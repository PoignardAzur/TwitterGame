/*
** The main server file
** The client needs to connect with their browser to a server running this
** script to get the application
*/

let http = require("http");
let twitterApi = require('./twitter_api');

// This function is called for every new client that tries to load a page
let on_request = require("./server_response").on_request;
let server = http.createServer(on_request);

var io = require('socket.io').listen(server);

io.sockets.on('connection', on_connection);
function on_connection (socket)
{
    console.log('New client connected!');

    socket.hashtags_str = "";
    socket.on("hashtags", on_hashtags);
    function on_hashtags(socket)
    {
        // TODO - Add hashtag handling
    }

    twitterApi.connectToTwitter(socket);
}

server.listen(8042);
