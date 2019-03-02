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
      loading: false
    }
    this.selectSpace = this.selectSpace.bind(this);
    this.hasPiece = this.hasPiece.bind(this);
    this.markSpace = this.markSpace.bind(this);
    this.removePiece = this.removePiece.bind(this);
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
    for (let i = 0; i < amount; i++) {
      let color = this.turnColor(i);
      players.push(this.buildSpaces(3, color));
    }
    for (let i = amount; i < 4; i++) {
      players.push(this.buildSpaces(3, null));
    }
    return players;
  }
  buildScores(amount) {
    let scores = [];
    for (let i = 0; i < amount; i++) {
      let color = this.turnColor(i);
      scores.push({ username: color, color, points: 0 })
    }
    return scores;
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
  async incrementTurn() {
    let { turn, scores } = await this.state;
    await turn === scores.length - 1 ?
      this.setState({turn: 0}) :
      this.setState({turn: turn + 1});
  }
  async changeTurn() {
    if (await this.boardMoves() === false) {
      await this.setState({ win: null, loading: true });
      await setTimeout(this.startGame, 1500);
    } else {
      await this.incrementTurn();
      while (await this.hasMoves() === false) {
        await this.incrementTurn();
      }
    }
  }
  async hasPiece(piece) {
    let { players, turn } = await this.state;
    return players[turn].some(space => space[piece] !== null);
  }
  async markSpace(size, index) {
    let { spaces } = await this.state;
    spaces[index][size] = this.turnColor();
    this.setState({ spaces });
  }
  async removePiece(size) {
    let { players, turn } = await this.state;
    for (let i = 0; i < 3; i++) {
      if (players[turn][i][size] !== null) {
        players[turn][i][size] = null;
        break;
      }
    }
    this.setState({ players });
  }
  async checkWin() {
    let { spaces } = this.state;
    return win(spaces);
  }
  async awardPoints(player) {
    let { scores } = await this.state;
    scores[player].points += 1;
    this.setState({ scores });
  }
  async hasMoves() {
    let { spaces } = await this.state;
    if (await this.hasPiece('large') && spaces.some(space => space.large === null)) {
      return true;
    } else if (await this.hasPiece('medium') && spaces.some(space => space.medium === null)) {
      return true;
    } else if (await this.hasPiece('small') && spaces.some(space => space.small === null)) {
      return true;
    } else {
      return false;
    }
  }
  async boardMoves() {
    let { spaces } = await this.state;
    return spaces.some(space => Object.values(space).some(piece => piece === null));
  }
  async selectSpace(size, color, index) {
    let { loading } = await this.state;
    if (loading) return;
    if (color === null && await this.hasPiece(size)) { // validates player
      await this.markSpace(size, index);
      await this.removePiece(size);
      if (await this.checkWin()) {
        await this.setState({ win: true, loading: true });
        await this.awardPoints(this.state.turn);
        await setTimeout(this.startGame, 1500);
      } else {
        await this.changeTurn();
      }
    }
  }
  startGame() {
    let spaces = this.buildSpaces(9, null);
    let players = this.buildPlayers(4);
    let scores = this.state.scores || this.buildScores(4);
    this.setState({ spaces, players, scores, win: false, turn: 0, loading: false });
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
          <Board select={() => {}} boardType={'player four'} spaces={this.state.players[3]} />
          <Board select={() => {}} boardType={'player three'} spaces={this.state.players[2]} />
          <Board select={() => {}} boardType={'player two'} spaces={this.state.players[1]} />
          <Board select={() => {}} boardType={'player one'} spaces={this.state.players[0]} />
        </div>
        <div className="stats">
          <Stats win={this.state.win} turn={this.state.turn} color={color} scores={this.state.scores}/> 
        </div> 
      </div>
      );
  }
}
