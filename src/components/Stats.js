import React from 'react';

export default function Stats(props) {
  return (
    <div className="stats">
      <h1>{props.scores[props.turn].username}{props.win ? ' wins!' : "'s turn"}</h1>
      <div className="points-container">
        {props.scores.map(score => {
          return (
            <div className="score-container">
              <p>{score.points}</p>
              <h4>{score.username}</h4>
            </div>
          )
        })}
      </div>
    </div>
  )
}
