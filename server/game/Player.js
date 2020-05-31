/**
 * @file Player Class
 * @author Dylan Dunn
 */

/** 
 * Represents a single instance of a fear temple game 
 * @param {String} name The name of the player
 * @param {Socket} socket The socket object the player is connected to
 */
class Player {
    constructor(isAdmin, name, socket) {

    this.isAdmin = isAdmin;
    this.name = name;
    this.socket = socket;
    this.hasKey
    this.role = "null";
    this.hand = {
        fire : 0,
        gold : 0,
        empty : 0
        }
    }
}

module.exports = Player;
