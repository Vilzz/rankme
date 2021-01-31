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

export const deleteQuery = (id) => async (dispatch) => {
  if (window.confirm('Удалить запрос?')) {
    try {
      await axios.delete(`/api/v1/requests/${id}`)
      dispatch({
        type: DELETE_QUERY,
        payload: id,
      })
      dispatch(setAlert(`Запрос успешно удален`, 'info'))
    } catch (err) {
      dispatch({
        type: QUERY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

export const updateQuery = (fileData, updateData, id, history) => async (
  dispatch
) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }
  const imagePlusData = new FormData()
  imagePlusData.append('file', fileData)
  imagePlusData.append('person', JSON.stringify(updateData))

  try {
    const res = await axios.put(`/api/v1/requests/${id}`, imagePlusData, config)
    dispatch({
      type: UPDATE_QUERY,
      payload: res.data,
    })
    dispatch(setAlert('Данные запроса обновлены', 'success'))
    history.push('/listqueries')
  } catch (err) {
    dispatch({
      type: QUERY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    })
  }
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
export const getAllQueries = (filters) => async (dispatch) => {
  const uristr = filters ? `/api/v1/requests${filters}` : '/api/v1/requests'
  try {
    const res = await axios.get(uristr)
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

export const createQuery = (fileData, formData, history) => async (
  dispatch
) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }
  const imagePlusData = new FormData()
  imagePlusData.append('file', fileData)
  imagePlusData.append('person', JSON.stringify(formData))
  try {
    const res = await axios.post('/api/v1/requests', imagePlusData, config)
    dispatch({
      type: CREATE_QUERY,
      payload: res.data,
    })
    dispatch(setAlert('Запрос создан успешно', 'success'))
    history.push('/listqueries')
  } catch (err) {
    const errors = err.response.data.error.split(',')
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, 'danger', 2500)))
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
