import React from 'react';
import '../App.css';
import Piece from './Piece';
export default function Space(props) {
  return (
    <div className="space">
      <Piece size="large" color="red" />
      <Piece size="medium" color="red" />
      <Piece size="small" color="red" />
    </div>
  )
}
