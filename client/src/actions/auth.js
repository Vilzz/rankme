import axios from 'axios'
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_QUERIES,
  CLEAR_QUERY,
} from './types'

import setAuthToken from '../utils/setAuthToken'

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_QUERY })
  dispatch({ type: CLEAR_QUERIES })
  dispatch({ type: LOG_OUT })
}

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
    try {
      const res = await axios.get('/api/v1/auth/me')
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      })
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const login = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await axios.post('/api/v1/auth/login', data, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.error.split(',')
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger')))
    }
    dispatch({ type: LOGIN_FAIL })
  }
}

export const register = ({ name, email, code, password }, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ name, email, code, password })
  try {
    const res = await axios.post('/api/v1/auth/register', body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        token: res.data.token,
        isAuthenticated: res.data.isAuthenticated,
        success: res.data.success,
      },
    })
    dispatch(loadUser())
    dispatch(
      setAlert(`Пользователь ${name} успешно зарегистрирован`, 'success')
    )
    history.push('/userdashboard')
  } catch (err) {
    const errors = err.response.data.error.split(',')
    if (errors) {
    }
    errors.forEach((error) => dispatch(setAlert(error, 'danger', 2000)))
  }
  dispatch({
    type: REGISTER_FAIL,
  })
}
//************************************************** */
// Неокончено!!!!!!!!!!!!!!!!
export const resetPassword = () => async (dispatch) => {
  console.log('тут надо доделать')
}
//************************************************** */
export const forgotPassword = (email) => async (dispatch) => {
  if (!email) {
    return dispatch(
      setAlert('Вы забыли указать адрес электронной почты', 'danger')
    )
  }
  const body = JSON.stringify({ email })
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    await axios.post('/api/v1/auth/forgotpassword', body, config)
    dispatch(
      setAlert(
        'Мы отправили ссылку на сброс пароля на указанный вами почтовый адрес',
        'success',
        2000
      )
    )
  } catch (err) {
    const errors = err.response.data.error.split(',')
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger', 2000)))
    }
    dispatch({
      type: REGISTER_FAIL,
    })
  }
}
