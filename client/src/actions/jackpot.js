import axios from 'axios';
import { setAlert } from './alert';
import { refreshUser } from './users';
import { UPDATE_USER, UPDATE_JACKPOT, END_JACKPOT, UPDATE_JACKPOT_GAMES, CLEAR_JACKPOT } from './types';

export const setUpBet = (luckycoins, socket) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        luckycoins
    });

    try {
        const res = await axios.post('api/jackpot', body, config);

        socket.emit('setUpBet')

        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}

export const updateJackpot = res => dispatch => {
    if (res === null || !res.jackpot) return;
    dispatch({
        type: UPDATE_JACKPOT,
        payload: res,
    })
}

export const endGame = res => dispatch => {
    dispatch({
        type: END_JACKPOT,
        payload: res,
    });
    setTimeout(() => {
        dispatch(updateJackpotGames())
        dispatch(refreshUser())
    }, 15000)
    setTimeout(() => {
        dispatch(clearJackpot());
    }, 25000)
}

export const updateJackpotGames = () => async dispatch => {
    try {
        const lastGames = await axios.get('api/jackpot');
        dispatch({
            type: UPDATE_JACKPOT_GAMES,
            payload: lastGames.data,
        })

    } catch (err) {
        dispatch(setAlert('Nie udało się załadować historii gier', 'danger'));
    }
}

export const clearJackpot = () => dispatch => {
    dispatch({
        type: CLEAR_JACKPOT,
    })
}





