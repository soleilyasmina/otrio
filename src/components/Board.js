import React, { useState } from 'react';
import Space from './Space.js';

export default function Board(props) {
  return (
    <div className="board">
      { props.spaces.map(space => <Space space={space}/>) }
    </div>
  )
}
