import React from 'react';
import '../App.css';
import Piece from './Piece';

export default function Space(props) {
  return (
    <div className="space">
      <Piece size="large" color={props.space.large} />
      <Piece size="medium" color={props.space.medium} />
      <Piece size="small" color={props.space.small} />
    </div>
  )
}
