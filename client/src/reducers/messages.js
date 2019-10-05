import { JACKPOT_MESSAGE } from "../actions/types";

const initialState = {
    jackpotMessages: [],
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case JACKPOT_MESSAGE:
            return {
                ...state,
                jackpotMessages: [payload, ...state.jackpotMessages]
            }
        default:
            return state;
    }
}