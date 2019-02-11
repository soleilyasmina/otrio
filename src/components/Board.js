import React, { useState } from 'react';
import Space from './Space.js';

export default function Board() {
  const [spaces, setSpaces] = useState([
      { large: null, medium: null, small: null },
      { large: null, medium: null, small: null },
      { large: null, medium: null, small: null },
      { large: null, medium: null, small: null },
      { large: null, medium: null, small: null },
      { large: null, medium: null, small: null },
      { large: null, medium: null, small: null },
      { large: null, medium: null, small: null },
      { large: null, medium: null, small: null }
    ])
  return (
    <div className="board">
      { spaces.map(space => <Space space={space}/>) }
    </div>
  )
}
