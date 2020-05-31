/**
 * @file GameManager Class
 * @author Dylan Dunn
 */

const { v4: uuid } = require('uuid');
const Game = require('./Game');
const Player = require('./Player.js');

/** Represents a single instance of a fear temple game */
 class GameManager {
    /**
     * Create a new game
     */
    constructor(io) {
        this.games = {}
        this.io = io;
    }

    //Handles incoming clients
    handleConnection(socket) {
        var gmInstance = this;
        var socketUsername;
        socket.on('createGame', function(username) {
            gmInstance.createGame(username, socket);
        });

        socket.on('joinGame', function(data) {
            gmInstance.joinGame(data.username, data.gameID, socket);
        })

        socket.on('start', function(gameID) {
            this.games[gameID].start();
        });
        
        socket.on('disconnect', function() {
            console.log('Client with username: ' + socketUsername + " disconnected :("); // We lost 'em
        });
    }

    joinGame(username, gameID, socket) {
        var newPlayer = new Player(false, username, socket.id);

        this.games[gameID].addPlayer(newPlayer);
        socket.join(gameID);1
        this.games[gameID].sendClientsUpdatedGameDataAndOtherSyncingStuff(this.io); //Passing IO around like a hot potato
    }

    //Create game and add it to list of current games
    createGame(adminUsername, socket) {
        console.log("Creating game....");
        var game = new Game();
        var gameID = game.getID();
        this.games[gameID] = game;
        console.log("Game created with ID: " + gameID);

        var adminPlayer = new Player(true, adminUsername, socket.id);
        game.addPlayer(adminPlayer);
        socket.join(game.id);
        game.sendClientsUpdatedGameDataAndOtherSyncingStuff(this.io); //Hot POtAto hOt poTAto
        return gameID;
    }
 }

 module.exports = GameManager;