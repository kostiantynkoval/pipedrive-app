import {
  GET_CLIENTS_REQUEST, GET_CLIENTS_SUCCESS, GET_CLIENTS_FAIL,
  GET_CLIENTS_AFTER_REORDER_REQUEST,
  SEARCH_CLIENTS_REQUEST, SEARCH_CLIENTS_SUCCESS, SEARCH_CLIENTS_FAIL,
  CREATE_CLIENT_REQUEST, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FAIL,
  UPDATE_CLIENT_REQUEST, UPDATE_CLIENT_SUCCESS, UPDATE_CLIENT_FAIL,
  UPDATE_CLIENT_PICTURE_REQUEST, UPDATE_CLIENT_PICTURE_SUCCESS, UPDATE_CLIENT_PICTURE_FAIL,
  REMOVE_CLIENT_REQUEST, REMOVE_CLIENT_SUCCESS, REMOVE_CLIENT_FAIL,
  GET_CLIENT_DETAILS_REQUEST, GET_CLIENT_DETAILS_SILENT_REQUEST, GET_CLIENT_DETAILS_SUCCESS, GET_CLIENT_DETAILS_FAIL,
  GET_ORGANIZATIONS_REQUEST, GET_ORGANIZATIONS_SUCCESS, GET_ORGANIZATIONS_FAIL,
  OPEN_DETAILS_WINDOW, CLOSE_DETAILS_WINDOW
} from '../actions/actionTypes'

const initialState = {
  list: [],
  searchTerm: null,
  selectedClient: null,
  isLoading: false,
  isClientLoading: false,
  isClientImgLoading: false,
  isDetailsActive: false,
  pagination: {
    limit: 10,
    start: 0
  },
  organizations: []
}

const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case GET_CLIENTS_AFTER_REORDER_REQUEST:
      return {
        ...state,
        isLoading: false
      }
    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload.data ? action.payload.data : [],
        pagination: action.payload['additional_data'].pagination,
        searchTerm: null
      }
    case GET_CLIENTS_FAIL:
      return {
        ...state,
        isLoading: false
      }
    case SEARCH_CLIENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case SEARCH_CLIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload.data ? action.payload.data : [],
        pagination: action.payload['additional_data'].pagination,
        searchTerm: action.payload.term
      }
    case SEARCH_CLIENTS_FAIL:
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
    case UPDATE_CLIENT_REQUEST:
      return {
          ...state,
          isClientLoading: true
      }
    case UPDATE_CLIENT_SUCCESS:
      return {
          ...state,
          isClientLoading: false,
      }
    case UPDATE_CLIENT_FAIL:
      return {
          ...state,
          isClientLoading: false
      }
    case UPDATE_CLIENT_PICTURE_REQUEST:
      return {
        ...state,
        isClientImgLoading: true
      }
    case UPDATE_CLIENT_PICTURE_SUCCESS:
      return {
        ...state,
        isClientImgLoading: false,
      }
    case UPDATE_CLIENT_PICTURE_FAIL:
      return {
        ...state,
        isClientImgLoading: false
      }
    case REMOVE_CLIENT_REQUEST:
      return {
        ...state,
        isClientLoading: true
      }
    case REMOVE_CLIENT_SUCCESS:
      return {
        ...state,
        isClientLoading: false,
      }
    case REMOVE_CLIENT_FAIL:
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
    case GET_CLIENT_DETAILS_SILENT_REQUEST:
      return {
        ...state,
        isClientLoading: false,
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