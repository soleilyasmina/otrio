import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import win from './services/winconditions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      players: [],
      win: false,
      turn: 0,
      selectedPiece: null,
      selectedSpace: null
    }
    this.selectPiece = this.selectPiece.bind(this);
    this.selectSpace = this.selectSpace.bind(this);
    this.setSpace = this.setSpace.bind(this);
    this.canMove = this.canMove.bind(this);
    this.checkWin = this.checkWin.bind(this);
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
    if (amount >= 3) players.push(this.buildSpaces(3, null));
    if (amount === 4) players.push(this.buildSpaces(3,null));
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
      await this.changeTurn();
    }
  }
  async checkWin() {
    await this.setState({win: win(this.state.spaces)});
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
  componentWillMount() {
    let spaces = this.buildSpaces(9, null);
    let players = this.buildPlayers(2);
    this.setState({ spaces, players });
  }
  render() {
    return (
        <div className="App">
          <Board select={this.selectSpace} boardType={'board'} spaces={this.state.spaces} />
          <Board select={this.selectPiece} boardType={'player'} spaces={this.state.players[0]} />
          <Board select={this.selectPiece} boardType={'player'} spaces={this.state.players[1]} />
        </div>
      );
  }
}
