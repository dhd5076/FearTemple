/**
 * @file Game Class
 * @author Dylan Dunn
 */

const { v4: uuid } = require('uuid'); // Too long, but might use later with shorter reference to it
const idGen = require('random-string');
const Player = require('./Player.js');

/** Represents a single instance of a fear temple game */
 class Game {
    /**
     * Create a new game
     */
    constructor() {
        this.players = [];
        this.id = idGen({length: 4});
        this.round = 0;
        this.currentCount = 0;
    }
    
    /**
     * Starts the game
     */
    start() {
        console.log("Game " + this.id + " Started.")
    }

    /**
     * 
     * @param {String} username 
     */
    removePlayer(username) {
        throw new Error("Not Implemented");
    }

    /**
     * Add a player to the game
     * @param {Player} player 
     */
    addPlayer(player) {
        this.players.push(player);
    }

    /**
     * Get the game id
     * @returns {String}
     */
    getID() {
        return this.id;
    }

    sendClientsUpdatedGameDataAndOtherSyncingStuff(io) { //Naming :)
        console.log("Sending game id  " + this.id + " data to " + this.players.length + " clients");
        io.sockets.in(this.id).emit('update', {
            id: this.id,
            round: this.round,
            players: this.players,
            playedCards: {
                fire: 0,
                gold: 0,
                empty: 0
            }
        });
    }
 }

 module.exports = Game;