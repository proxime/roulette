import React from 'react'

const PlayerList = ({ jackpot }) => {
  const renderList = jackpot.players.map(player => (
    <div className="jackpot__players-item" key={player._id}>
      <div
        className="jackpot__players-image"
        style={{ backgroundImage: `url(avatars/${player.userId.avatar})` }}
      ></div>
      <div
        className="jackpot__players-color"
        style={{ backgroundColor: player.userId.color }}
      ></div>
      <div className="jackpot__players-body">
        <div className="jackpot__players-nick">{player.userId.nick}</div>
        <div className="jackpot__players-cash">
          {player.cash} <i className="fas fa-coins"></i>
        </div>
        <div className="jackpot__players-chance">
          {Math.round((player.cash / jackpot.cash) * 10000000) / 100000}%
        </div>
      </div>
    </div>
  ))

  return (
    <div className="jackpot__players-container">
      <div className="jackpot__players-title">Lista Graczy</div>
      {renderList}
    </div>
  )
}

export default PlayerList
