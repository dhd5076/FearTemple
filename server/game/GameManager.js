/**
 * @file GameManager Class
 * @author Dylan Dunn
 */

const uuid = require('uuid');
const Game = require('./Game');
const Player = require('./Player.js');

/** Represents a single instance of a fear temple game */
 class GameManager {
    /**
     * Create a new game
     */
    constructor() {
        this.games = []
    }

    handleConnection(socket) {
        socket.on('createGame', function() {
            socket.emit('gameCreated', {gameID : GameManager.createGame()})
        })

        socket.on('startGame', function(gameID) {
            games.array.forEach(game => {
                if(game.id == gameID) {
                    game.start();
                }
            });
        });
    }

    createGame() {
        var game = new Game();
        this.games.push(game);
        return game.id;
    }
 }

 module.exports = GameManager;