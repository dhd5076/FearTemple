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
        this.playedCards = {
            gold: 0,
            fire: 0,
            empty: 0
        }
        this.adminPlayer = username;
        this.round = 0;
        this.cardPlayed = false;
        this.totalCardCount = 0;
        this.isStarted = false;
        this.currentCount = 0;
        this.mostRecentCard = '';
        this.message = "Waiting for " + username + " to start the game...";
        
        this.turnsLeftInRound;

        //players, advents, guards | advant gardes?? 
        this.roleDistribution = [
            [1, 1, 0],
            [2, 1, 2],
            [3, 2, 2], //Everything below this is made up to make my life easier
            [4, 3, 2],
            [5, 3, 2],
            [6, 4, 2],
            [7, 5, 3],
            [8, 6, 3],
            [9, 6, 3], //Really wish there was a decent pattern to this
            [10, 7, 4] 
        ]
        
        //players, empty, gold, fire
        this.cardDistribution = [
            [1, 4, 1, 1],
            [2, 6, 2, 1],
            [3, 8, 5, 2], //Everything below this is made up to make my life easier
            [4, 12, 6, 2],
            [5, 16, 7, 2],
            [6, 20, 8, 2],
            [7, 26, 7, 2], //This little switcherooni means I can't do this algorithmically or at least it makes hardcoding easier
            [8, 30, 8, 2],
            [9, 34, 9, 2],
            [10, 37, 10, 3],
        ]

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
        this.players[0].isCurrentPlayer = true;

        this.playedCards = {
            empty : this.cardDistribution[this.players.length - 1][1],
            gold  : this.cardDistribution[this.players.length - 1][2],
            fire  : this.cardDistribution[this.players.length - 1][3],
        }

        this.totalCardCount = this.playedCards.empty + this.playedCards.gold + this.playedCards.fire;

        this.turnsLeftInRound = this.players.length; //1 keycard pass for every player in game per round


        //ASSIGN ROLES
        var roles = []

        for(var i = 0; i < this.roleDistribution[this.players.length - 1][0]; i++) {
            roles.push("advent"); 
        }

        for(var i = 0; i < this.roleDistribution[this.players.length - 1][1]; i++) {
            roles.push("guard");
        }

        for(var i = 0; i < this.players.length; i++) {
            var roleIndex = Math.floor(Math.random() * Math.floor(roles.length));
            this.players[i].role = roles[roleIndex]
            roles.splice(roleIndex, 1);
        }

        this.dealCards();

        this.currentPlayer = this.players[0].name
        this.message = "Waiting for " + this.adminPlayer + " to play a card";
        cb();
    }

    /**
     * Deals cards out to players
     * This function is going to be a doozy 
     */
    dealCards() {
        var cards = []
        var cardsPerPlayer = this.totalCardCount - (this.round * this.players.length);

        for(var i = 0; i < this.playedCards.empty; i++) {
            cards.push("empty");
        }

        for(var i = 0; i < this.playedCards.gold; i++) {
            cards.push("gold");
        }

        for(var i = 0; i < this.playedCards.fire; i++) {
            cards.push("fire");
        }

        console.log(this.totalCardCount);

        //Assign cards
        for(var i = 0; i < this.players.length; i++) { 
            console.log("asdasdasd");
            for(var x = 0; x < cardsPerPlayer; x++) { 
                var cardIndex = Math.floor(Math.random() * Math.floor(cards.length));
                var card = cards[cardIndex]
                if(card == "empty") {
                    this.players[i].hand.empty += 1;
                }
                if(card == "gold") {
                    this.players[i].hand.gold += 1;
                }
                if(card == "fire") {
                    this.players[i].hand.fire += 1;
                }
                cards.splice(cardIndex, 1);
            }
        }
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
            setTimeout(() => {
                this.message = "Waiting for " + player.name + " to choose next player..."
            }, 100);
        });

        //Handle choosePlayer command
        this.io.sockets.connected[player.socket].on("choosePlayer", (username) => { // yep
            this.currentPlayer = username;
            console.log(player.name + " choose " + username + " as the new keyholder");
            player.isCurrentPlayer = true;
            this.sendClientsUpdatedGameDataAndOtherSyncingStuff(this.io);
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
        io.sockets.in(this.id).emit('update', {
            id: this.id,
            round: this.round,
            mostRecentCard: this.mostRecentCard,
            players: this.players,
            currentPlayer : this.currentPlayer,
            turnsLeftInRound: this.turnsLeftInRound, 
            playedCards: this.playedCards,
            message : this.message
        });
    }
 }

 module.exports = Game;