/**
 * @file GameModel Object Class
 * @author Dylan Dunn
 */

const uuid = require('uuid');
const Player = require('./Player.js');

/** Represents a single instance of a fear temple game */
 class Game {
    /**
     * Create a new game
     */
    constructor() {
    this.players = [];
    this.id = uuid();
    this.currentCount = 0;
    }
    
    /**
     * Starts the game
     */
    startGame() {
        this.players.forEach((player, index) => {
            player.setRole(Player.Role.Guardian);
        });
    }

    /**
     * End the current round
     */
    endRound() {

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

    /**
     * Get all players in the game
     * @returns {Player[]}
     */
    getPlayers() {
        return this.players;
    }
 }

 module.exports = GameModel;