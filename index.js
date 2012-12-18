#!/usr/bin/env node

var restify = require("restify");

var server = restify.createServer();

function respond (req, res, next) {
    res.send("Hello " + req.params.name);
}

server.get("/hello/:name", respond);

server.listen(8080, function() {
    console.log("%s listening at %s", server.name, server.url);
});