import React, { useState } from 'react';
import Space from './Space.js';

export default function Board(props) {
  return (
    <div className={props.boardType}>
      { props.spaces.map((space, index) => <Space key={index} index={index} select={props.select} space={space}/>) }
    </div>
  )
}
