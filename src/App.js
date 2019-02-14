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
      points: [0,0],
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
    players.push(this.buildSpaces(3, 'firebrick'));
    players.push(this.buildSpaces(3, 'royalblue'));
    amount >= 3 ? players.push(this.buildSpaces(3, 'darkgreen')): players.push(this.buildSpaces(3, null));
    amount === 4 ? players.push(this.buildSpaces(3, 'darkorchid')) : players.push(this.buildSpaces(3, null));
    return players;
  }
  async changeTurn() {
    let { turn, players } = this.state;
    await turn === players.length - 1 ?
      this.setState({turn: 0}) :
      this.setState({turn: turn + 1});
  }
  turnColor() {
    switch(this.state.turn) {
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
  async selectPiece(piece, color, index) {
    if (color === null || color !== this.turnColor()) return;
    await this.state.selectedPiece ?
      this.setState({selectedPiece: null}) :
      this.setState({selectedPiece: {piece, color, index}});
    this.canMove();
  }
  async selectSpace(space, color, index) {
    if (color !== null) return;
    let { selectedSpace } = this.state;
    await selectedSpace ?
      this.setState({selectedSpace: null}) :
      this.setState({selectedSpace: {space, index}});
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
  async checkWin() {
    await this.setState({ win: win(this.state.spaces) });
    if (this.state.win) {
      let { points } = this.state;
      points[this.state.turn] += 1;
      setTimeout(this.startGame, 3000);
      await this.setState({ turn: 0, points });
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
    let players = this.buildPlayers(4);
    this.setState({ spaces, players, win: false });
  }
  componentWillMount() {
    this.startGame();
  }
  render() {
    let color = this.turnColor();
    return (
      <div className="App">
        <div className="game">
          <Board select={this.selectPiece} boardType={'player three'} spaces={this.state.players[2]} />
          <Board select={this.selectPiece} boardType={'player four'} spaces={this.state.players[3]} />
          <Board select={this.selectSpace} boardType={'board'} spaces={this.state.spaces} />
          <Board select={this.selectPiece} boardType={'player two'} spaces={this.state.players[1]} />
          <Board select={this.selectPiece} boardType={'player one'} spaces={this.state.players[0]} />
        </div>
        <div className="stats">
          <Stats win={this.state.win} turn={this.state.turn} color={color}/> 
        </div>
      </div>
      );
  }
}
