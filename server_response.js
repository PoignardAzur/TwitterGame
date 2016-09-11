/*
** The part of the code that handles browsers connecting to the server
*/

let url = require("url");
let querystring = require('querystring');
let fs = require('fs');

module.exports.on_request = on_request;
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
