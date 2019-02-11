import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Player from './components/Player';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [
        { large: null, medium: null, small: null },
        { large: null, medium: null, small: null },
        { large: null, medium: null, small: null },
        { large: null, medium: null, small: null },
        { large: null, medium: null, small: null },
        { large: null, medium: null, small: null },
        { large: null, medium: null, small: null },
        { large: null, medium: null, small: null },
        { large: null, medium: null, small: null }
      ],
      win: false,
      players: 2,
      turn: 1,
      selectedPiece: null,
      selectedSpace: null
    }
    this.selectPiece = this.selectPiece.bind(this);
    this.selectSpace = this.selectSpace.bind(this);
  }
  selectPiece(piece, index) {
    this.state.selectedPiece ?
      this.setState({selectedPiece: null}) :
      this.setState({selectedPiece: {piece, index}})
  }
  selectSpace(space, index) {
    this.state.selectedSpace ?
      this.setState({selectedSpace: null}) :
      this.setState({selectedSpace: {space, index}})
  }
  render() {
    return (
        <div className="App">
          <Board select={this.selectSpace} spaces={this.state.spaces} />
          <Player select={this.selectPiece} />
        </div>
      );
  }
}

