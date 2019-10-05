import React, { useRef, useState } from 'react';

const JackpotDraw = ({ jackpot }) => {
    const crossElement = useRef(null);
    const [offset, setOffset] = useState(0);

    const getCross = () => {
        if (crossElement.current) {
            const crossOffset = crossElement.current.offsetLeft;
            const crossWidth = crossElement.current.clientWidth;
            const offset = crossOffset + crossWidth / 2;

            return offset;
        }
    }

    if (offset === 0) {
        if (jackpot.winnerOffset !== 0) {
            setOffset(jackpot.winnerOffset * 200 - getCross());
        }
    }

    if (jackpot.winnerOffset === 0 && offset !== 0) {
        setOffset(0);
    }

    const drawItems = jackpot.gameTable.map((item, index) => (
        <div className="jackpot__draw-item" key={index} style={{ backgroundColor: item.color }}>
            <div className="jackpot__draw-image"></div>
            <div className="jackpot__draw-body">
                <div className="jackpot__draw-nick">{item.nick}</div>
                <div className="jackpot__draw-cash">{(Math.round(item.chance * 10000000)) / 100000}%</div>
            </div>
        </div>
    ));

    return (
        <div className="jackpot__draw">
            <div ref={crossElement} className="jackpot__draw-cross"></div>
            <div style={offset ? { left: `-${offset}px`, transition: 'left 15s ease' } : { left: `${offset}px`, transition: 'left 0s ease' }} className="jackpot__draw-container">
                {drawItems}
            </div>
        </div>
    );
}

export default JackpotDraw;