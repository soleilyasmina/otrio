import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Stats from './components/Stats';
import win from './services/winconditions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      players: [],
      win: false,
      turn: 0,
      scores: null,
      selectedPiece: null,
      selectedSpace: null
    }
    this.selectSpace = this.selectSpace.bind(this);
    this.spaceIsOpen = this.spaceIsOpen.bind(this);
    this.turnColor = this.turnColor.bind(this);
    this.startGame = this.startGame.bind(this);
  }
  // workflow:
  // selectSpace chooses a space
  // spaceIsOpen validates the space
  // hasPiece validates the player
  // markSpace changes the space to the right color
  // removePiece removes the piece from the player
  // checkWin checks if there are win conditions
  // if win then awardPoints, game is reset
  // if not then changeTurn
  // hasMoves checks the following player to see if they have moves
  // if !hasMoves, boardMoves checks every player for moves (calling hasMoves on each player)
  // if !boardMoves, game is reset

  buildSpaces(amount, color) {
    let spaces = [];
    for (let i = 0; i < amount; i++) {
      spaces.push({ large: color, medium: color, small: color});
    }
    return spaces;
  }
  buildPlayers(amount) {
    let players = [];
    for (let i = 0; i < amount; i++) {
      let color = this.turnColor(i);
      players.push(this.buildSpaces(3, color));
    }
    for (let i = amount; i < 4; i++) {
      players.push(this.buildSpaces(3,null));
    }
    return players;
  }
  async changeTurn() {
    let { turn, scores } = this.state;
    await turn === scores.length - 1 ?
      this.setState({turn: 0}) :
      this.setState({turn: turn + 1});
  }
  turnColor(turn = this.state.turn) {
    switch(turn) {
      case 1:
        return 'royalblue';
      case 2:
        return 'darkgreen';
      case 3:
        return 'darkorchid';
      default:
        return 'firebrick';
    }
  }
  spaceIsOpen = async (index, size) => await this.state.spaces[index][size] === null;

  async selectSpace(size, color, index) {
    if (color !== null) return;
    if (this.spaceIsOpen(index, size)) {
      console.log('success');
    }
  }
  startGame() {
    let spaces = this.buildSpaces(9, null);
    let players = this.buildPlayers(4);
    // let scores = this.state.scores || this.buildScores(4);
    this.setState({ spaces, players, win: false, turn: 0 });
  }
  componentWillMount() {
    this.startGame();
  }
  render() {
    let color = this.turnColor();
    return (
      <div className="App">
        <div className="game">
          <Board select={this.selectSpace} boardType={'board'} spaces={this.state.spaces} />
          <Board boardType={'player four'} spaces={this.state.players[3]} />
          <Board boardType={'player three'} spaces={this.state.players[2]} />
          <Board boardType={'player two'} spaces={this.state.players[1]} />
          <Board boardType={'player one'} spaces={this.state.players[0]} />
        </div>
        {// <div className="stats">
          // <Stats win={this.state.win} turn={this.state.turn} color={color} scores={this.state.scores}/> 
          // </div> 
        }
      </div>
      );
  }
}
