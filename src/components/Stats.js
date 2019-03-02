import React from 'react';

export default function Stats(props) {
  let content;
    switch(props.win) {
      case true:
        content = `${props.scores[props.turn].username} wins!`;
        break;
      case null:
        content = `It's a tie!`
        break;
      default:
        content = `${props.scores[props.turn].username}'s turn.`;
        break;
    }
  return (
    <div className="stats">
      <h1>OTRIO</h1>
      <h3>{ content }</h3>
      <div className="points-container">
        {props.scores.map(score => {
          return (
            <div className="score-container">
              <h4>{score.username}</h4>
              <h4>{score.points}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}
