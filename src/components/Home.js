import React from 'react';

export default function Home(props) {
  return (
    <div className="Home">
      <h1>OTRIO</h1>
      <div className="player-container">
        <div onClick={() => console.log('online')}>online</div>
        <div onClick={() => console.log('2P')}>2P</div>
        <div onClick={() => console.log('3P')}>3P</div>
        <div onClick={() => console.log('4P')}>4P</div>
      </div>
    </div>
  )
}
