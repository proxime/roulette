import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import messages from './messages';
import jackpot from './jackpot';

export default combineReducers({
    alert,
    auth,
    messages,
    jackpot
});