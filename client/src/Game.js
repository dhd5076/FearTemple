import React from 'react';
import './Game.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

class Game extends React.Component {
  render() {
    return(
      <Container className="p-0 m-0">
        <Row>
          <PlayerRoleCard />
          <GameBoard />
          <PlayersList />
        </Row>
      </Container>
    )
  }
}

class GameBoard extends React.Component {
  render() {
    return 
  }
}

class PlayersList extends React.Component {
  render() {
    return(
      <Card style={{ width:'12rem'}}>
        <Card.Body>
          <Player />
        </Card.Body>
      </Card>
    )
  }
}

class PlayerRoleCard extends React.Component {
  render() {
    return (
      <Card style={{ width: '12rem' }}>
        <Card.Img variant="top" src="https://via.placeholder.com/64x128" />
      </Card>
    )
  }
}

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <p> {this.props.username} </p>
    )
  }
}


export default Game;
