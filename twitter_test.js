
let Twit = require('twit')

module.exports.connectToTwitter = connectToTwitter;
function connectToTwitter(socket)
{
    socket.hashtags_str = '#KohLanta';

    let twitSocket = new Twit({
        consumer_key:         'REDACTED'
        , consumer_secret:      'REDACTED'
        , access_token:         'REDACTED'
        , access_token_secret:  'REDACTED'
    });

    twitSocket.get('search/tweets', { q: socket.hashtags_str }, get_callback);
    function get_callback(err, data, response)
    {
        if (err)
        {
            on_error(err);
        }
        else
        {
            for (status of data.statuses)
            {
                socket.emit("new_tweet", status.user.name, status.text);
            }
        }
    };

    let twitStream = twitSocket.stream(
        'statuses/filter',
        { track: [socket.hashtags_str] }
    );
    twitStream.on('tweet', on_tweet);
    twitStream.on('error', on_error);

    function on_tweet(tweet)
    {
        socket.emit("new_tweet", tweet.user.name, tweet.text);
    }

    function on_error(err)
    {
        console.log("Error trying to read search/tweets:")
        console.log(err);
        socket.emit("error", "Failed to connect to twitter");
    }

    socket.on("disconnect", function() {
        twitStream.stop();
    });
}
