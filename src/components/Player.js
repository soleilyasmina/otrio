import React from 'react';
import Space from './Space.js';

export default function Player(props) {
  return (
    <div className="board">
      <Space index={0} select={props.select} space={{large: 'red', medium: 'red', small: 'red'}} />
      <Space index={1} select={props.select} space={{large: 'red', medium: 'red', small: 'red'}} />
      <Space index={2} select={props.select} space={{large: 'red', medium: 'red', small: 'red'}} />
    </div>
  )
}
