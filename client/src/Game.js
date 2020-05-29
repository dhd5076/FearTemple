import React from 'react';
import './Game.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Badge';

class Game extends React.Component {
  render() {
    return(
      <Container className="p-4 m-2 bg-dark col-12 text-info">
        <span class="justify-content-between d-flex">
          <h1 className="text-white mb-4"> Temple Of Fear</h1>
          <h1 className="text-white mb-4"> Round 1</h1>
        </span>
        <Row>
          <div className="col-9">
            <GameCard type="hunter"/>
            <CurrentRound />
            <PlayerHand />
          </div>
          <div className="col-3">
            <PlayersList />
            <button type="button" className="mt-2 btn btn-primary"> Toggle Music</button> { /* Because the bootstrap-react one is broken */ }
          </div>
        </Row>
      </Container> 
    )
  }
}

class PlayerHand extends React.Component {
  render() {
    return(
      <Container className="p-0 ml-0 mt-4">
        <h4> Your Hand</h4>
        <Row>
          <GameCard type="gold" value={1} isButton={true}/>
          <GameCard type="fire" value={8} isButton={true}/>
          <GameCard type="empty" value={1} isButton={true}/>
        </Row>
      </Container>
    )
  }
}

class CurrentRound extends React.Component {
  render() {
    return(
      <Container className="p-0 ml-0 mt-4">
        <h4> Current Round</h4>
        <Row>
          <GameCard type="gold" value={1} />
          <GameCard type="fire"value={2}/>
          <GameCard type="empty" value={3}/>
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
        <Card.Img className="rounded" variant="top" style={{height: '20rem' }} src={"http://localhost/static/" + this.props.type  + ".png"}/>
        <Card.ImgOverlay>
          <Card.Title className="text-white"> 
            {this.props.value ? (
              <Badge variant="success" className="rounded-circle" style={{height: '40px', width: '40px'}}> 
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

class PlayersList extends React.Component {
  render() {
    return(
      <ListGroup>
        <Player username="SaladLover69" isPlayer={true}/>
        <Player username="Dylan" hasKeyCard={true}/>
        <Player username="Sad Player"/>
      </ListGroup>
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
