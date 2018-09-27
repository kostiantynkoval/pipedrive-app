import axios from 'axios'
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
  CLOSE_DETAILS_WINDOW, OPEN_DETAILS_WINDOW
} from './actionTypes'

const url = process.env.REACT_APP_API_URL
const tokenString = `?api_token=${process.env.REACT_APP_API_TOKEN}`

// Action Creators

export const getClients = (start, limit, isReorder = false) => dispatch => {
  isReorder ? dispatch(actionSucceed(GET_CLIENTS_AFTER_REORDER_REQUEST)) : dispatch(actionRequested(GET_CLIENTS_REQUEST))
  return axios
    .get(`${url}/persons${tokenString}&start=${start}&limit=${limit}&sort=7876c07667bae0482c5d9bad11c0268688fbc544`)
    .then(res => {
      if(res.data.success) {
        dispatch(actionSucceed(GET_CLIENTS_SUCCESS, res.data))
      } else {
        dispatch(actionFailed(GET_CLIENTS_FAIL))
      }
    })
    .catch(err => {
      console.log('getClientsRequest err', err);
      dispatch(actionFailed(GET_CLIENTS_FAIL))
    })
}

export const searchClients = (term, start, limit) => dispatch => {
  dispatch(actionRequested(SEARCH_CLIENTS_REQUEST))
  axios
    .get(`${url}/persons/find${tokenString}&term=${term}&start=${start}&limit=${limit}`)
    .then(res => {
      if(res.data.success) {
        dispatch(actionSucceed(SEARCH_CLIENTS_SUCCESS, {data: res.data.data, additional_data: res.data.additional_data,  term}))
      } else {
        dispatch(actionFailed(SEARCH_CLIENTS_FAIL))
      }
    })
    .catch(err => {
      console.log('getClientsRequest err', err);
      dispatch(actionFailed(SEARCH_CLIENTS_FAIL))
    })
}

export const getClientDetails = (id, silent = false) => dispatch => {

  silent ? dispatch(actionRequested(GET_CLIENT_DETAILS_SILENT_REQUEST)) : dispatch(actionRequested(GET_CLIENT_DETAILS_REQUEST))
  axios
    .get(`${url}/persons/${id}${tokenString}`)
    .then(res => {
      if(res.data.success) {
        dispatch(actionSucceed(GET_CLIENT_DETAILS_SUCCESS, res.data.data))
        dispatch(openDetailsWindow())
      } else {
        dispatch(actionFailed(GET_CLIENT_DETAILS_FAIL))
      }
    })
    .catch(err => {
      console.log('getClientsRequest err', err);
      dispatch(actionFailed(GET_CLIENTS_FAIL))
    })
}

export const getOrganizations = () => dispatch => {
  dispatch(actionRequested(GET_ORGANIZATIONS_REQUEST))
  axios
    .get(`${url}/organizations${tokenString}&user_id=${process.env.REACT_APP_USER_ID}&limit=500&start=0`)
    .then(res => {
      if(res.data.success) {
        dispatch(actionSucceed(GET_ORGANIZATIONS_SUCCESS, res.data.data))
        dispatch(openDetailsWindow())
      } else {
        console.log('getOrganizations success error', res)
        dispatch(actionFailed(GET_ORGANIZATIONS_FAIL))
      }
    })
    .catch(err => {
      console.log('getOrganizations err', err);
      dispatch(actionFailed(GET_ORGANIZATIONS_FAIL))
    })
}

export const addClient = (data, history, start, limit) => dispatch => {
  dispatch(actionRequested(CREATE_CLIENT_REQUEST))
  axios
    .post(`${url}/persons${tokenString}`, data)
    .then(res => {
      if(res.data.success) {
        dispatch(actionSucceed(CREATE_CLIENT_SUCCESS, res.data.data))
        history.push('/')
        dispatch(getClients(start, limit))
      } else {
        dispatch(actionFailed(CREATE_CLIENT_FAIL))
      }
    })
    .catch(err => {
      console.log('addClient err', err);
      dispatch(actionFailed(CREATE_CLIENT_FAIL))
    })
}

export const updateClient = (data, history, start, limit) => dispatch => {
    dispatch(actionRequested(UPDATE_CLIENT_REQUEST))
    return axios
        .put(`${url}/persons/${data.id}${tokenString}`, data)
        .then(res => {
            if(res.data.success) {
                dispatch(actionSucceed(UPDATE_CLIENT_SUCCESS, res.data.data))
                history && history.push('/')
                history && dispatch(getClients(start, limit))
            } else {
                dispatch(actionFailed(UPDATE_CLIENT_FAIL))
            }
        })
        .catch(err => {
            console.log('addClient err', err);
            dispatch(actionFailed(UPDATE_CLIENT_FAIL))
        })
}

export const updateClientPicture = (id, data) => dispatch => {
  dispatch(actionRequested(UPDATE_CLIENT_PICTURE_REQUEST))
  axios
    .post(`${url}/persons/${id}/picture${tokenString}`, data)
    .then(res => {
      if(res.data.success) {
        dispatch(actionSucceed(UPDATE_CLIENT_PICTURE_SUCCESS, res.data.data))
        dispatch(getClientDetails(id, true))
      } else {
        dispatch(actionFailed(UPDATE_CLIENT_PICTURE_FAIL))
      }
    })
    .catch(err => {
      console.log('addClient err', err);
      dispatch(actionFailed(UPDATE_CLIENT_PICTURE_FAIL))
    })
}

export const deleteClient = (id, history, start, limit) => dispatch => {
  dispatch(actionRequested(REMOVE_CLIENT_REQUEST))
  axios
    .delete(`${url}/persons/${id}${tokenString}`)
    .then(res => {
      if(res.data.success) {
        dispatch(actionSucceed(REMOVE_CLIENT_SUCCESS, res.data.data))
        history.push('/')
        dispatch(getClients(start, limit))
      } else {
        dispatch(actionFailed(REMOVE_CLIENT_FAIL))
      }
    })
    .catch(err => {
      console.log('addClient err', err);
      dispatch(actionFailed(REMOVE_CLIENT_FAIL))
    })
}

export const openDetailsWindow = () => ({
  type: OPEN_DETAILS_WINDOW
})

export const closeDetailsWindow = () => ({
  type: CLOSE_DETAILS_WINDOW
})

// Actions
const actionRequested = (type) => ({type})
const actionSucceed = (type, payload) => ({type, payload})
const actionFailed = (type) => ({type})