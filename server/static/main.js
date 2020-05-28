var socket = io();
var canvas = document.getElementById('canvas').getContext('2d');

var currentGame;
var currentPlayer;
var phaserGame;

var playerAvatar;
var playerUsername;
var otherPlayers = [];

socket.on('message', function(data) {
  console.log(data);
});

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 200 }
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var phaserGame = new Phaser.Game(config);

function preload ()
{
  this.load.setBaseURL('http://labs.phaser.io');

  this.load.image('sky', 'assets/skies/space3.png');
  this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  this.load.image('red', 'assets/particles/red.png');
}

function create()
{
  playerAvatar = this.add.rectangle(64 + 12, 64 + 12, 128, 128, 0x000000bb);
  playerUsername = this.add.text(128 + 24, 12, "Username", {fontSize: 24});

  var cardWidth = 100;
  var cardHeight = 150;
  var cardMargin = 12;

  //TODO: Push these to otherPlayers or draw object base on position
  this.add.rectangle(800 - 256, 12 + 24, 48, 48, 0x00bb0000);
  this.add.rectangle(800 - 115, 12 + 24, 235, 48, 0x0000bb00);

  this.add.text(800 - (256 - 32), 14, "Player 1", {fontSize: 24});
  this.add.text(800 - (256 - 32), 40, "Choosing A Card", {fontSize: 12});

  new Card().draw();

  this.add.rectangle(12 + 75, 500 - 12, 150, 200, 0x0000bb00);


}

function update() {

}

class Card {
  constructor() {

  }

  draw() {
    this.add.rectangle(12 + (cardWidth / 2), 600 - (300 + (12 * 2)), cardWidth, cardHeight, 0x00bbbb00);
  }
}

class Game {
  constructor() {

  }
}

class Player {
  constructor() {

  }
}