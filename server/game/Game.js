/**
 * @file Game Class
 * @author Dylan Dunn
 */

const { v4: uuid } = require('uuid'); // Too long, but might use later with shorter reference to it
const idGen = require('randomstring');
const Player = require('./Player.js');

/** Represents a single instance of a fear temple game */
 class Game {
    /**
     * Create a new game
     */
    constructor(username, io) {
        this.players = [];
        this.io = io;
        this.id = idGen.generate({
            length: 4,
            readable: true,
            charset: 'BDFGHJKLMSTVX'
        });
        this.adminPlayer = username;
        this.round = 0;
        this.isStarted = false;
        this.currentCount = 0;
        this.message = "Waiting for " + username + " to start the game...";
        this.currentPlayer = ""

        setInterval(() => {
            this.sendClientsUpdatedGameDataAndOtherSyncingStuff(io);
        }, 500)
    }
    
    /**
     * Starts the game
     */
    start(cb) {
        console.log("Game " + this.id + " Started.")
        this.isStarted = true;
        this.players[0].role = "guard";
        this.currentPlayer = this.players[0].name
        this.message = "Waiting for " + this.adminPlayer + " to play a card";
        cb();
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

        //Handle playCard command
        this.io.sockets.connected[player.socket].on("playCard", () => { // yep
            console.log(player.name + " asked to play a card");
            this.message = player.name + " played a card"
        });

        //Handle choosePlayer command
        this.io.sockets.connected[player.socket].on("choosePlayer", (username) => { // yep
            this.currentPlayer = username;
            console.log(player.name + " choose " + username + " as the new keyholder");
        });
    }

    /**
     * Get the game id
     * @returns {String}
     */
    getID() {
        return this.id;
    }

    sendClientsUpdatedGameDataAndOtherSyncingStuff(io) { //Naming :)
        //console.log("Sending game id " + this.id + " data to " + this.players.length + " clients");
        io.sockets.in(this.id).emit('update', {
            id: this.id,
            round: this.round,
            players: this.players,
            currentPlayer : this.currentPlayer, 
            playedCards: {
                fire: 0,
                gold: 0,
                empty: 0
            },
            message : this.message
        });
    }
 }

 module.exports = Game;