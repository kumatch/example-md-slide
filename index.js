var fs = require('fs');
var format = require('util').format;
var express = require('express');

var app = express.createServer();
var staticDir = express.static;

var revealjsDir = 'reveal.js';
var opts = {
    port: 8000,
    baseDir: __dirname
};

app.configure(function() {
   [ 'css', 'js', 'images', 'plugin', 'lib' ].forEach(function(entry) {
       var resource = format('/%s/%s', revealjsDir, entry);
       var map_path = opts.baseDir + resource;

       app.use(resource, staticDir(map_path));
    });
});

app.get("/", function(req, res) {
    fs.createReadStream(opts.baseDir + '/index.html').pipe(res);
});

app.get("/README.md", function(req, res) {
    fs.createReadStream(opts.baseDir + '/README.md').pipe(res);
});

app.listen(opts.port);
console.log('Listening on port ' + opts.port);
