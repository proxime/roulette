import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER,
  DELETE_ACCOUNT,
  REFRESH_USER,
  REFRESH_FAIL,
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
    case UPDATE_USER:
    case REFRESH_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
    case REFRESH_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
    default:
      return state
  }
}
