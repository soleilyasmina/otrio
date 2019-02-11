import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Player from './components/Player';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
        <Player />
      </div>
    );
  }
}

export default App;
