var GameManager = require('./game/GameManager');

const io = require('socket.io')(7001);

gameManager = new GameManager(io);

io.on('connection', function(socket) {
  console.log("Client Connected!");
  gameManager.handleConnection(socket)
});
