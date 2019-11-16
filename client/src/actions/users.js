import axios from 'axios'
import { setAlert } from './alert'
import {
  UPDATE_USER,
  UPDATE_FAIL,
  DELETE_ACCOUNT,
  REFRESH_USER,
  REFRESH_FAIL,
} from './types'

// Set Nick
export const setNick = nick => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({
    nick,
  })

  try {
    const res = await axios.post('api/users/nick', body, config)

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: UPDATE_FAIL,
    })
  }
}

// Update User
export const updateUser = (
  { nick, name, email },
  history,
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({
    nick,
    name,
    email,
  })

  try {
    const res = await axios.put('api/users/', body, config)

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    })

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: UPDATE_FAIL,
    })
  }
}

// Change Password
export const changePassword = (
  history,
  password,
  newPassword,
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({
    password,
    newPassword,
  })

  try {
    await axios.post('api/users/password', body, config)

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// Delete user
export const deleteUser = password => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({
    password,
  })

  try {
    await axios.post('api/auth/deleteAccount', body, config)

    dispatch({
      type: DELETE_ACCOUNT,
    })
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}

// Add luckycoins
export const addCoins = (coins, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const body = JSON.stringify({
    coins,
  })

  try {
    const res = await axios.post('/api/users/coins', body, config)

    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    })

    history.push('/dashboard')
  } catch (err) {
    dispatch(setAlert('Wystąpił błąd, spróbuj ponownie', 'danger'))
  }
}

// Refresh user
export const refreshUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')

    dispatch({
      type: REFRESH_USER,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: REFRESH_FAIL,
    })
    dispatch(setAlert('Wystąpił błąd, spróbuj ponownie', 'danger'))
  }
}

// Change user avatar
export const changeAvatar = image => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  const body = new FormData()
  body.append('image', image)

  try {
    const res = await axios.post('/api/users/avatar', body, config)

    dispatch({
      type: UPDATE_USER,
      payload: res.data.user,
    })

    window.location.reload()
  } catch (err) {
    console.log(err.response.data.msg)
  }
}
