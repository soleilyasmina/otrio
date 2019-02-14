import React from 'react';

export default function Stats(props) {
  return (
    <div className="">
      <h1>Player {props.turn + 1}{props.win ? ' wins!' : "'s turn"}</h1>
    </div>
  )
}
