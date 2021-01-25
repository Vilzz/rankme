import {
  CREATE_QUERY,
  GET_QUERY,
  GET_QUERIES,
  UPDATE_QUERY,
  DELETE_QUERY,
  QUERY_ERROR,
  CLEAR_QUERIES,
  CLEAR_QUERY,
} from '../actions/types'

const initialState = {
  loading: true,
  queries: null,
  query: null,
  error: {},
}
// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CREATE_QUERY:
    case UPDATE_QUERY:
    case GET_QUERY:
      return {
        ...state,
        loading: false,
        query: payload,
      }
    case CLEAR_QUERY:
      return {
        ...state,
        query: null,
        loading: false,
      }
    case CLEAR_QUERIES:
      return {
        ...state,
        queries: null,
        loading: false,
      }
    case DELETE_QUERY:
      return {
        ...state,
        queries: {
          ...state.queries,
          count: state.queries.count - 1,
          total: state.queries.total - 1,
          data: state.queries.data.filter((query) => query._id !== payload),
        },
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
