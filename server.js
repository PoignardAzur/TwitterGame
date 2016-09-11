let http = require('http');
let url = require("url");
let querystring = require('querystring');
var fs = require('fs');

var server = http.createServer(on_request);
function on_request(req, res)
{
    let parsed_url = url.parse(req.url);
    let pathname = parsed_url.pathname;
    var params = querystring.parse(parsed_url.query);

    console.log(pathname);
    console.log(params);

    if (pathname == "/")
        var file_sent = "./main.html";
    else if (pathname == "/build.js")
        var file_sent = "./build.js";
    else
    {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1>404: No such page</h1>");
        return;
    }

    fs.readFile(file_sent, 'utf-8', function(error, content)
    {
        if (error)
        {
            res.writeHead(500, {"Content-Type": "text/html"});
            res.end("<h1>500: Internal error</h1>" +
            "<p>Cannot load page.</p>");
        }
        else if (file_sent == "./build.js")
            res.writeHead(200, {"Content-Type": "application/javascript"});
        else
            res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
};

var io = require('socket.io').listen(server);

io.sockets.on('connection', on_connection);
function on_connection (socket)
{
    console.log('New client connected!');

    socket.on("hashtags", on_hashtags);
    function on_hashtags(socket)
    {

    }

    // TODO - Handle twitter there
    socket.emit("new_tweet", "Name", "Content");
}


server.listen(8042);
