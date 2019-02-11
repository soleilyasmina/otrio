import React from 'react';
import Space from './Space.js';

export default function Player(props) {
  return (
    <div className="board">
      <Space space={{large: 'red', medium: 'red', small: 'red'}} />
      <Space space={{large: 'red', medium: 'red', small: 'red'}} />
      <Space space={{large: 'red', medium: 'red', small: 'red'}} />
    </div>
  )
}
