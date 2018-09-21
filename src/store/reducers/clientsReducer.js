import {
  GET_CLIENTS_REQUEST, GET_CLIENTS_SUCCESS, GET_CLIENTS_FAIL,
  GET_CLIENT_DETAILS_REQUEST, GET_CLIENT_DETAILS_SUCCESS, GET_CLIENT_DETAILS_FAIL,
  OPEN_DETAILS_WINDOW, CLOSE_DETAILS_WINDOW
} from '../actions/actionTypes'
import { push } from 'react-router-dom'

const initialState = {
  list: [],
  selectedClient: null,
  isLoading: false,
  isClientLoading: false,
  isDetailsActive: false
}

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      }
    case GET_CLIENTS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case GET_CLIENT_DETAILS_REQUEST:
      return {
        ...state,
        isClientLoading: true,
      }
    case GET_CLIENT_DETAILS_SUCCESS:
      return {
        ...state,
        isClientLoading: false,
        selectedClient: action.payload,
      }
    case GET_CLIENT_DETAILS_FAIL:
      return {
        ...state,
        isClientLoading: false,
        selectedClient: null
      }
    case OPEN_DETAILS_WINDOW:
      console.log('OPEN_DETAILS_WINDOW')
      return {
        ...state,
        isDetailsActive: true
      }
    case CLOSE_DETAILS_WINDOW:
      return {
        ...state,
        isDetailsActive: false
      }
    default:
      return state
  }
}

export default clientsReducer