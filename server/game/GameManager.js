/**
 * @file GameManager Class
 * @author Dylan Dunn
 */

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
        var gmInstance = this; //Really messy, but its not my fault (that I know of), ES6 scopes and 'this' are confusing and arrow functions are even more confusing
        var socketUsername;
        socket.on('createGame', function(username) {
            gmInstance.createGame(username, socket);
        });

        socket.on('joinGame', function(data) {
            gmInstance.joinGame(data.username, data.gameID, socket);
        })

        socket.on('start', function(data) {
            gmInstance.games[data.gameID].start(() => {
                gmInstance.games[data.gameID].sendClientsUpdatedGameDataAndOtherSyncingStuff(gmInstance.io); //Hot Potato
            });
        });
        
        socket.on('disconnect', function() {
            //Should probably try and smoothly handle disconnected players, but it's not too important right now
        });
    }

    joinGame(username, gameID, socket) {
        var newPlayer = new Player(false, username, socket.id);

        /*
        The following prevents crashing when a player joins a non-existant game
        Also, the following method probably exposes this project to a horrendous
        amount of security flaws and should be changed in the future.
        */
       try {
        this.games[gameID].addPlayer(newPlayer);
        if(!this.games[gameID].isStarted) { //Don't let players join mid-game
            socket.join(gameID);
        } else {
            socket.emit("oops", "That game has already started!")
        }
        this.games[gameID].sendClientsUpdatedGameDataAndOtherSyncingStuff(this.io); //Passing IO around like a hot potato
       } catch {
           socket.emit("oops", "That game ID does not exist!"); //Because 'error' is reserved, hence 10 minutes of time wasted debugging
       }
    }

    //Create game and add it to list of current games
    createGame(adminUsername, socket) {
        var game = new Game(adminUsername, this.io); //Potato
        var gameID = game.getID();
        this.games[gameID] = game;

        socket.join(game.id, () => {
            var adminPlayer = new Player(true, adminUsername, socket.id);
            game.addPlayer(adminPlayer); //Nested to prevent occasional sync errors where data is sent back incomplete
            game.sendClientsUpdatedGameDataAndOtherSyncingStuff(this.io); //Hot POtAto hOt poTAto
        });
        return gameID;
    }
 }

 module.exports = GameManager;