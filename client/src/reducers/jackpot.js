import { UPDATE_JACKPOT, END_JACKPOT, UPDATE_JACKPOT_GAMES, CLEAR_JACKPOT } from "../actions/types";

const initialState = {
    cash: 0,
    players: [],
    time: 0,
    started: false,
    gameTable: [],
    lastGames: [],
    winnerOffset: 0,
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_JACKPOT:
            return {
                ...state,
                cash: payload.jackpot.cash,
                players: payload.jackpot.players,
                time: payload.time,
                started: payload.jackpot.started,
            }
        case END_JACKPOT:
            return {
                ...state,
                gameTable: [...payload.gameTable],
                winnerOffset: payload.winnerOffset,
                time: 0,
                started: false,
                cash: 0,
                players: []
            }
        case UPDATE_JACKPOT_GAMES:
            return {
                ...state,
                lastGames: payload,
            }
        case CLEAR_JACKPOT:
            return {
                ...state,
                gameTable: [],
                winnerOffset: 0,
            }
        default:
            return state;
    }
}