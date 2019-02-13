import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Player from './components/Player';
import win from './services/winconditions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      players: [],
      win: false,
      turn: 1,
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
  async selectPiece(piece, index) {
    await this.state.selectedPiece ?
      this.setState({selectedPiece: null}) :
      this.setState({selectedPiece: {piece, index}});
    this.canMove();
  }
  async selectSpace(space, index) {
    let { selectedSpace } = this.state;
    await selectedSpace ?
      this.setState({selectedSpace: null}) :
      this.setState({selectedSpace: {space, index}});
    this.canMove();
  }
  canMove() {
    let { selectedSpace, selectedPiece } = this.state;
    console.log(selectedSpace, selectedPiece);
    if (selectedSpace && selectedPiece) {
      this.setSpace(selectedSpace.space, selectedSpace.index);
      this.removePiece(selectedPiece.piece, selectedPiece.index);
      this.setState({ selectedPiece: null, selectedSpace: null });
      this.checkWin();
    }
  }
  checkWin() {
    console.log(win(this.state.spaces));
  }
  setSpace(space, index) {
    let { spaces } = this.state;
    spaces[index][space] = 'red';
    this.setState({ spaces });
  }
  removePiece(piece, index) {
    let { players } = this.state;
    players[index][piece] = null;
    this.setState({ players });
  }
  componentDidMount() {
    let spaces = this.buildSpaces(9, null);
    let players = this.buildSpaces(3, 'red');
    this.setState({ spaces, players });
  }
  render() {
    return (
        <div className="App">
          <Board select={this.selectSpace} spaces={this.state.spaces} />
          <Board select={this.selectPiece} spaces={this.state.players} />
        </div>
      );
  }
}
