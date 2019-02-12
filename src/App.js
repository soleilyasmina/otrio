import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Player from './components/Player';

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
  }
  buildSpaces(amount, color) {
    let spaces = [];
    for (let i = 0; i < amount; i++) {
      spaces.push({ large: color, medium: color, small: color});
    }
    return spaces;
  }
  selectPiece(piece, index) {
    this.state.selectedPiece ?
      this.setState({selectedPiece: null}) :
      this.setState({selectedPiece: {piece, index}})
  }
  selectSpace(space, index) {
    this.state.selectedSpace ?
      this.setState({selectedSpace: null}) :
      this.setState({selectedSpace: {space, index}});
    this.setSpace(space, index);
    this.removePiece(this.state.selectedPiece.piece, this.state.selectedPiece.index);
    this.setState({ selectedPiece: null, selectedSpace: null });
  }
  setSpace(space, index) {
    let { spaces } = this.state;
    spaces[index][space] = 'red';
    this.setState({spaces});
  }
  removePiece(piece, index) {
    let { players } = this.state;
    players[index][piece] = null;
    this.setState({ players });
  }
  componentDidMount() {
    let spaces = this.buildSpaces(9, null);
    let players = this.buildSpaces(3, 'red');
    this.setState({ spaces, players })
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

