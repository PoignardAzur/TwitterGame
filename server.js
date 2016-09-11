/*
** The main server file
** The client needs to connect with their browser to a server running this
** script to get the application
*/

let twitterApi = require('./twitter_api');
let io = require('socket.io').listen(8042);;

io.sockets.on('connection', on_connection);
function on_connection (socket)
{
    console.log('New client connected!');

    socket.hashtags_str = "";
    socket.on("hashtags", on_hashtags);
    function on_hashtags(hashtag_list)
    {
        if (!socket.hashtags_str)
        {
            for (line of hashtag_list.split('\n'))
            {
                for (word of line.split(' '))
                {
                    // Should prevent code injections (?)
                    if (word.match(/^#\w+$/))
                    {
                        socket.hashtags_str += word + " ";
                    }

                }
            }

            if (socket.hashtags_str)
            {
                twitterApi.connectToTwitter(socket);
            }
        }
    }
}
