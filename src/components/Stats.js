import React from 'react';

export default function Stats(props) {
  return (
    <h1>Player {props.turn + 1}{props.win ? ' wins!' : "'s turn"}</h1>
  )
}
