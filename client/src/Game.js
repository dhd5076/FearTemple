import React from 'react';
import './Game.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {Howl, Howler} from 'howler';
import IO from "socket.io-client";
const ENDPOINT = "http://localhost:7001"

const socket = IO(ENDPOINT);

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.startGame = this.startGame.bind(this);
    this.createGame = this.createGame.bind(this); 
    this.joinGame = this.joinGame.bind(this);
    this.onPlayerJoinGame = this.onPlayerJoinGame.bind(this); 
    this.playCard = this.playCard.bind(this); 

    this.state = {
      menuSound : new Howl({
        src: ['menu.mp3'],
        volume: 0.5
      }),
      gameplaySound : new Howl({
        src: ['gameplay.mp3'],
        volume: 0.5
      }),
      playerName: '',
      role: 'null', //In hindsight calling it null might cause headaches in the future
      playerHand: {
        fire: 0,
        gold: 0,
        empty: 0
      },
      isAdmin: false,
      gameData: {
        id: 'GAME ID',
        round: 0,
        players: [],
        playedCards: {
          fire: 0,
          gold: 0,
          empty: 0
        },
        message: 'Waiting...'
      }
    }
    this.state.menuSound.play();
  }

  componentDidMount() {
    console.log("Game Client Loaded");
    socket.on("update", gameData => {
      gameData.players.forEach(player => {
        if(player.name.toString() === this.state.playerName.toString()) {
          this.setState({
            role : player.role,
            playerHand: player.hand
          });
        }
      });

      this.setState({
          gameData : gameData
        });
    });

    socket.on("oops", (message) => { //Something went wrong, 'error' is reserved by socket.io
      alert(message);
      window.location.reload(); //Easiest way, probably should be changed to something smoother
    });
  }

  playSoundEffect(name) {
    new Howl({
      src: [name + '.mp3'],
      volume: 0.5
    }).play();


  }

  onPlayerJoinGame() {
    this.state.menuSound.fade(0.5, 0, 2500);
    this.playSoundEffect('join');
    this.state.gameplaySound.play();
    this.state.gameplaySound.fade(0, 0.05, 10000);
  }

  joinGame() {
    var username = document.getElementById("username").value
    document.getElementById("startButton").remove();
    this.setState({
      playerName: username
    });
    var gameID = document.getElementById("gameID").value
    socket.emit('joinGame', {
      username: username,
      gameID: gameID
    });
    this.onPlayerJoinGame();
  }

  //Sends command to server to create a new game
  createGame() {
    var username = document.getElementById("username").value
    this.setState({
      playerName: username
    });
    this.playerName = username;
    socket.emit('createGame', username);
    this.onPlayerJoinGame();
  } 

  //Sends command to server to start a new game
  startGame() {
    document.getElementById("startButton").remove();
    socket.emit('start', { 
      gameID:  this.state.gameData.id
    });
  }

  //Sends command to server to play a card
  playCard() {
    socket.emit('playCard', { 
      gameID: this.state.gameData.id,
      username: this.playerName
    });
  }

  render() {
    return(
      <Container  className="gbg p-4 m-2 bg-light col-12 text-info">
        <span className="justify-content-between d-flex">
          <h1 className="text-white mb-4"> Temple Of Fear</h1>
          <h2 className = "p-4 text-dark bg-light font-weight-bold" 
              style={{borderRadius: "12px", fontFamily: "consolas"}}> 
              {this.state.gameData.id} 
          </h2>
          <h1 className="text-white mb-4"> Round {this.state.gameData.round}</h1>
        </span>
        <Row>
          <div className="col-9">
            <GameCard type={this.state.role}/>
            <CurrentRound 
              fire={this.state.gameData.playedCards.fire}
              gold={this.state.gameData.playedCards.gold}
              empty={this.state.gameData.playedCards.empty} />
            <PlayerHand 
            fire={this.state.playerHand.fire}
            gold={this.state.playerHand.gold}
            empty={this.state.playerHand.empty} />
          </div>
          <div className="col-3">
            <PlayersList players={this.state.gameData.players}/>
            <button type="button" className="mt-2 btn btn-sm btn-secondary"> Toggle Music</button> { /* Because the bootstrap-react one is broken */ }
            <div height="500px"/>
            {}
            <button id="playCardButton" type="button" className="mb-4 mt-4 float-right col-12 btn btn-lg btn-primary" onClick={this.playCard}> Play Card </button>
            <button id="startButton" type="button" className="mt-4 col-12 btn btn-lg btn-success" onClick={this.startGame}> Start Game</button>
            <h5 className="mt-4 text-white"> {this.state.gameData.message} </h5>
          </div>
        </Row>
      <LoadModal playerName={this.state.playerName} joinGameHandler={this.joinGame} createGameHandler={this.createGame}/>
      </Container> 
    )
  }
}

//Shows the modal at the beginning with options to create or join a game
class LoadModal extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      joinGameHandler : this.props.joinGameHandler,
      createGameHandler : this.props.createGameHandler
    }

    /* Won't work without this because ES6 overwrites 'this' to the current scope, big dumb
    This took 2 days to figure out, this is the hackier but easier to read version as opposed 
    to the dumpster fire that is arrow functions, i.e joinGame = () => { none; }, like huh??? */ 
    this.joinGame = this.joinGame.bind(this); //Use this this not that this or your this
    this.createGame = this.createGame.bind(this); //Use this this and not that this or your this
  }
  
  joinGame() {
    this.state.joinGameHandler();
    this.setState(state => ({
      show: false
    }));
  }

  createGame() {
    this.state.createGameHandler();
    this.setState(state => ({
      show: false
    }));
  }

  render() {
      return (
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.state.show}
      >
        <Modal.Body>
          <h4>Join Or Create Game</h4>
          <InputGroup className="mt-4">
            <InputGroup.Prepend>
              <InputGroup.Text>@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="col-12"
              placeholder="Username" id="username"
            />
          </InputGroup>
          <InputGroup className="mt-4">
            <InputGroup.Prepend>
              <InputGroup.Text>ID</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="col-12"
              placeholder="Game ID (If joining a game)" id="gameID"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" id="createGameButton" 
            onClick={this.createGame}>Create New Game</Button>
          <Button id="joinGameButton"
            onClick={this.joinGame}>Join Game</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

//The cards in the players hand
class PlayerHand extends React.Component {
  render() {
    return(
      <Container className="p-0 ml-0 mt-4">
        <h4> Your Hand</h4>
        <Row>
          <GameCard type="gold" value={this.props.gold.toString()} isButton={false}/>
          <GameCard type="fire" value={this.props.fire.toString()} isButton={false}/>
          <GameCard type="empty" value={this.props.empty.toString()} isButton={false}/>
        </Row>
      </Container>
    )
  }
}

//The set of cards that have already been played
class CurrentRound extends React.Component {
  render() {
    return(
      <Container className="p-0 ml-0 mt-4">
        <h4> Current Round</h4>
        <Row>
          <GameCard type="gold" value={this.props.gold.toString()} />
          <GameCard type="fire" value={this.props.fire.toString()}/>
          <GameCard type="empty" value={this.props.empty.toString()}/>
        </Row>
      </Container>
    )
  }
}

class GameCard extends React.Component {
  render() {
    return(
      //Horrific way to hide the card object behind the card images
      <Card className="m-2 text-dark rounded" style={{maxHeight:'20rem', maxWidth: '200px', backgroundColor: 'rgba(255, 255, 255, 0.0)'}}>
        <Card.Img className="rounded" variant="top" style={{height: '20rem' }} src={"/" + this.props.type  + ".png"}/>
        <Card.ImgOverlay>
          <Card.Title className="text-white"> 
            {this.props.value ? (
              <Badge variant="secondary" className="rounded-circle" style={{height: '40px', width: '40px'}}> 
              <h4> {this.props.value} </h4>
              </Badge>
            ) : (
              null
            )}
            {this.props.isButton ? (
              //Absolutely horrific way to show mouse cursor on hover
              <button className="stretched-link" href="" style={{background : 'transparent', border: 'none', color: 'transparent'}}></button>
            ) : (
              null
            )}
           </Card.Title>
        </Card.ImgOverlay>
      </Card>
    )
  }
}

//Shows The List of Players
class PlayersList extends React.Component {
  render() {
    return(
      <ListGroup>
        {this.props.players.map((player, i) => {
          return <Player key={i} username={player.name} hasKeyCard={player.hasKey}/>
        })}
      </ListGroup>
    )
  }
}

//A single player element in the list of players
class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <ListGroup.Item action variant={this.props.isPlayer ? ("success") : ("info")} className="text-right">
        <h4> 
          {this.props.username + ' '}
          {this.props.hasKeyCard ? (
             <Badge variant="secondary"> Key </Badge>
          ) : (
            null
          )}
         </h4>
      </ListGroup.Item>
    )
  }
}


export default Game;
