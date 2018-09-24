import {
  GET_CLIENTS_REQUEST, GET_CLIENTS_SUCCESS, GET_CLIENTS_FAIL,
  CREATE_CLIENT_REQUEST, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FAIL,
  GET_CLIENT_DETAILS_REQUEST, GET_CLIENT_DETAILS_SUCCESS, GET_CLIENT_DETAILS_FAIL,
  GET_ORGANIZATIONS_REQUEST, GET_ORGANIZATIONS_SUCCESS, GET_ORGANIZATIONS_FAIL,
  OPEN_DETAILS_WINDOW, CLOSE_DETAILS_WINDOW
} from '../actions/actionTypes'

const initialState = {
  list: [],
  selectedClient: null,
  isLoading: false,
  isClientLoading: false,
  isDetailsActive: false,
  pagination: {},
  organizations: []
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
        list: action.payload.data,
        pagination: action.payload['additional_data'].pagination
      }
    case GET_CLIENTS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case CREATE_CLIENT_REQUEST:
      return {
        ...state,
        isClientLoading: true
      }
    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        isClientLoading: false,
      }
    case CREATE_CLIENT_FAIL:
      return {
        ...state,
        isClientLoading: false
      }
    case GET_ORGANIZATIONS_REQUEST:
      return {
        ...state
      }
    case GET_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: action.payload
      }
    case GET_ORGANIZATIONS_FAIL:
      return {
        ...state
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