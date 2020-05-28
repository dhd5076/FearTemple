/**
 * @file Mananges current game instances
 * @author Dylan Dunn
 */
const Game = require('./Game');

/**
 * Manages a set of games
 */
 class GameManager {
    constructor() {
        this.games = []
    }

    /**
     *  Create a new game and add it to manager
     * @returns {String} the gameID
     */
    createGame() {
        var game = new Game();
        this.games.push(game);
        return game.getID();
    }
 }