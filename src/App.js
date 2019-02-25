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
    this.selectPiece = this.selectPiece.bind(this);
    this.selectSpace = this.selectSpace.bind(this);
    this.setSpace = this.setSpace.bind(this);
    this.canMove = this.canMove.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.turnColor = this.turnColor.bind(this);
    this.startGame = this.startGame.bind(this);
    this.markSelected = this.markSelected.bind(this);
  }
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
  buildScores(amount) {
    let scores = [];
    for (let i = 0; i < amount; i++) {
      let color = this.turnColor(i);
      scores.push({ points: 0, username: color, color });
    }
    return scores;
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
  async markSelected(selected) {
    let { selectedPiece, players, turn } = this.state;
    let { index, piece, color } = selectedPiece;
    if(selected) {
      players[turn][index][piece] += ' selected' ;
    } else {
      players[turn][index][piece] = players[turn][index][piece].split(' ')[0];
    }
    this.setState({ players });
  }
  async selectPiece(piece, color, index) {
    if (color === null || color !== this.turnColor()) return;
    if (this.state.selectedPiece) {
      await this.markSelected(false);
      await this.setState({selectedPiece: null});
    } else {
      await this.setState({selectedPiece: {piece, color, index}});
      await this.markSelected(true);
    }
    
  }
  async selectSpace(space, color, index) {
    if (color !== null || this.state.selectedPiece === null ) return;
    let { selectedSpace } = await this.state;
    if (selectedSpace) {
      this.setState({selectedSpace: null});
    } else {
      this.setState({selectedSpace: {space, index}});
    }
    this.canMove();
  }
  async canMove() {
    let { selectedSpace, selectedPiece } = this.state;
    console.log(selectedSpace, selectedPiece);
    if (selectedSpace && selectedPiece 
      && selectedSpace.space === selectedPiece.piece) {
      await this.setSpace(selectedSpace, selectedPiece.color);
      await this.removePiece(selectedPiece);
      await this.setState({ selectedPiece: null, selectedSpace: null });
      await this.checkWin();
    }
  }
  async hasMoves() {
    let { spaces, players } = this.state;
  }
  async checkWin() {
    await this.setState({ win: win(this.state.spaces) });
    if (this.state.win) {
      let { scores } = this.state;
      scores[this.state.turn].points += 1;
      await setTimeout(this.startGame, 3000);
      await this.setState({ turn: 0, scores });
    } else {
      await this.changeTurn();
    }
  }
  async setSpace(selectedSpace, color) {
    let { space, index } = selectedSpace;
    let { spaces } = this.state;
    spaces[index][space] = color;
    await this.setState({ spaces });
  }
  async removePiece(selectedPiece) {
    let { piece, index } = selectedPiece;
    let { players, turn } = this.state;
    players[turn][index][piece] = null;
    await this.setState({ players });
  }
  startGame() {
    let spaces = this.buildSpaces(9, null);
    let players = this.buildPlayers(2);
    let scores = this.state.scores || this.buildScores(2);
    this.setState({ spaces, players, scores, win: false, turn: 0 });
  }
  componentWillMount() {
    this.startGame();
  }
  render() {
    let color = this.turnColor();
    console.log(this.state.players);
    return (
      <div className="App">
        <div className="game">
          <Board select={this.selectSpace} boardType={'board'} spaces={this.state.spaces} />
          <Board select={this.selectPiece} boardType={'player four'} spaces={this.state.players[3]} />
          <Board select={this.selectPiece} boardType={'player three'} spaces={this.state.players[2]} />
          <Board select={this.selectPiece} boardType={'player two'} spaces={this.state.players[1]} />
          <Board select={this.selectPiece} boardType={'player one'} spaces={this.state.players[0]} />
        </div>
        <div className="stats">
          <Stats win={this.state.win} turn={this.state.turn} color={color} scores={this.state.scores}/> 
        </div>
      </div>
      );
  }
}
