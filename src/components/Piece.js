import React from 'react';
import '../App.css';

export default function Piece(props) {
  return (
    <div onClick={() => props.select(props.size, props.color, props.index)}
      className={`${props.size} ${props.color} piece`}></div>
    )
}
