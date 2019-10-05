import { DELETE_TRASH, CLEAR_ALERTS } from "./types";

export const deleteTrash = () => dispatch => {
    window.scrollTo(0, 0);

    dispatch({
        type: DELETE_TRASH
    });
}

export const clearAlerts = () => dispatch => {
    dispatch({
        type: CLEAR_ALERTS
    });
}