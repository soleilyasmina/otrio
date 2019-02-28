import React from 'react';

export default function Stats(props) {
  return (
    <div className="stats">
      <h1>OTRIO</h1>
      <h3>{props.scores[props.turn].username}{props.win ? ' wins!' : "'s turn"}</h3>
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
