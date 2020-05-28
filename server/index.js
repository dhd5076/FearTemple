var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);app.set('port', 80);


app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, './static/index.html'));
});// Starts the server.

server.listen(80, function() {
  console.log('Starting server on port 80');
});

io.on('connection', function(socket) {

});