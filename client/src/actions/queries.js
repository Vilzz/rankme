import axios from 'axios'
import { setAlert } from './alert'
import {
  CREATE_QUERY,
  GET_QUERY,
  GET_QUERIES,
  UPDATE_QUERY,
  DELETE_QUERY,
  QUERY_ERROR,
} from './types'

export const updateQuery = (updateData) => async (dispatch) => {
  console.log(updateData)
}

export const getQuery = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/requests/${id}`)
    dispatch({
      type: GET_QUERY,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: QUERY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const getQueries = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/requests?createdby=${id}`)
    dispatch({
      type: GET_QUERIES,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: QUERY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const createQuery = (queryData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await axios.post(
      '/api/v1/requests',
      JSON.stringify(queryData),
      config
    )
    dispatch({
      type: CREATE_QUERY,
      payload: res.data,
    })
    dispatch(setAlert('Запрос создан успешно', 'success'))
  } catch (err) {
    const errors = err.response.data.error.split(',')
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger', 3000)))
    }
    dispatch({
      type: QUERY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}
