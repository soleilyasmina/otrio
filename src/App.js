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
      selectedPlace: 'large'
    }
    this.selectPiece = this.selectPiece.bind(this);
  }
  selectPiece(piece, index) {
    this.state.selectedPiece ?
      this.setState({selectedPiece: null}) :
      this.setState({selectedPiece: {piece, index}})
  }
  render() {
    return (
        <div className="App">
          <Board spaces={this.state.spaces} />
          <Player select={this.selectPiece} />
        </div>
      );
  }
}

