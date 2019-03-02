import React from 'react';

export default function Home(props) {
  return (
    <div className="Home">
      <h1>OTRIO</h1>
      <div className="player-container">
        <div onClick={() => props.start(1)}>online</div>
        <div onClick={() => props.start(2)}>2P</div>
        <div onClick={() => props.start(3)}>3P</div>
        <div onClick={() => props.start(4)}>4P</div>
      </div>
    </div>
  )
}
