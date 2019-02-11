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
      seletedPlace: 'large'
    }
  }
  render() {
    return (
        <div className="App">
          <Board spaces={this.state.spaces} />
          <Player />
        </div>
      );
  }
}

