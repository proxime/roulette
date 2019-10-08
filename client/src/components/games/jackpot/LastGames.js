import React from 'react';

const LastGames = ({ jackpot }) => {
    const winnerItems = jackpot.lastGames.map(item => (
        <div className="jackpot__winners-item" key={item._id}>
            <div className="jackpot__players-image"></div>
            <div className="jackpot__players-body">
                <div className="jackpot__players-nick">{item.winner}</div>
                <div className="jackpot__players-cash">Wygrana: {item.cash} <i className="fas fa-coins"></i></div>
            </div>
        </div>
    ))

    return (
        <div className="jackpot__winners-container">
            <div className="jackpot__winners-title">Ostatni Zwyciężcy</div>
            {winnerItems}
        </div>
    );
}

export default LastGames;