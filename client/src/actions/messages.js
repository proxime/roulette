import { JACKPOT_MESSAGE } from "./types";

export const setJackpotMessages = res => dispatch => {
    dispatch({
        type: JACKPOT_MESSAGE,
        payload: res
    });
}