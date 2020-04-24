/**
 * @file Handles Current Players
 * @author Dylan Dunn
 */

/** 
 * Represents a single instance of a fear temple game 
 * @param {String} name The name of the player
 * @param {Socket} socket The socket object the player is connected to
 */
class Player {
    constructor(name, socket) {
    this.name = name;
    this.socket = socket;

    this.isKeyPlayer;
    this.roleCard = Role.Unassigned;
    this.hand = [];
    }

    /**
     * Get the name of the player
     * @returns {String} The player's name
     */
    getName() {
        return this.name;
    }

    /**
     * Get Hand
     * @returns {String[]}
     */
    getHand() {
        return this.hand;
    }

    /**
     * Set the player's hand
     * @param {String[]} hand 
     */
    clearHand(hand) {
        this.hand = hand;
    }

    /**
     * Set the player's role card
     * @param {Role} roleCard
     */
    setRole(roleCard) {
        this.roleCard = roleCard;
    }

    /**
     * Get the player's role card
     */
    getRole() {
        return this.roleCard;
    }

    /**
     * Possible player roles
     */
    static Role = {
        Guardian: "Guardian",
        Adventurer: "Adventurer",
        Unassigned: "Unassigned"
    }
}

module.exports = GameModel;
