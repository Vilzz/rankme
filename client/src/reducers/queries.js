import {
  CREATE_QUERY,
  GET_QUERY,
  GET_QUERIES,
  UPDATE_QUERY,
  DELETE_QUERY,
  QUERY_ERROR,
} from '../actions/types'

const initialState = {
  loading: true,
  queries: null,
  query: null,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_QUERY:
    case GET_QUERY:
      return {
        ...state,
        loading: false,
        query: payload,
      }
    case GET_QUERIES:
      return {
        ...state,
        loading: false,
        queries: payload,
      }
    case QUERY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return {
        ...state,
      }
  }
}
