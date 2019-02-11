import React from 'react';
import '../App.css';

export default function Piece(props) {
  return (
      <div className={`${props.size} ${props.color} piece`}></div>
    )
}
