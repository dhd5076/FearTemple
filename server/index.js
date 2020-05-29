var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var gameManager = require('./game/GameManager');

var app = express();
var server = http.Server(app);
var io = socketIO(server);app.set('port', 8080);


app.use('/static', express.static(__dirname + '/static'));

app.use('*', (req, res) => {
  res.send("This be the game API, you aren't supposed to be here");
});

server.listen(80, function() {
  console.log('Starting server on port 80');
});

io.on('connection', function(socket) {
  gameManager.handleConnection(socket)
});