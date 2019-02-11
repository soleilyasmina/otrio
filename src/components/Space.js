import React from 'react';
import '../App.css';
import Piece from './Piece';

export default function Space(props) {
  return (
    <div className="space">
      <Piece index={props.index} select={props.select} size="large" color={props.space.large} />
      <Piece index={props.index} select={props.select} size="medium" color={props.space.medium} />
      <Piece index={props.index} select={props.select} size="small" color={props.space.small} />
    </div>
  )
}
