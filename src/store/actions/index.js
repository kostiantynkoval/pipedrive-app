import axios from 'axios'
import {
  GET_CLIENTS_REQUEST, GET_CLIENTS_SUCCESS, GET_CLIENTS_FAIL,
  CREATE_CLIENT_REQUEST, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FAIL,
  GET_CLIENT_DETAILS_REQUEST, GET_CLIENT_DETAILS_SUCCESS, GET_CLIENT_DETAILS_FAIL,
  GET_ORGANIZATIONS_REQUEST, GET_ORGANIZATIONS_SUCCESS, GET_ORGANIZATIONS_FAIL,
  CLOSE_DETAILS_WINDOW, OPEN_DETAILS_WINDOW
} from './actionTypes'

const url = process.env.REACT_APP_API_URL
const tokenString = `?api_token=${process.env.REACT_APP_API_TOKEN}`

// Action Creators

export const getClients = (start = 0, limit = 10) => dispatch => {
  dispatch(actionRequested(GET_CLIENTS_REQUEST))
  axios
    .get(`${url}/persons${tokenString}&start=${start}&limit=${limit}`)
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

export const getClientDetails = id => dispatch => {

  dispatch(actionRequested(GET_CLIENT_DETAILS_REQUEST))
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

export const addClient = (data, history) => dispatch => {

  dispatch(actionRequested(CREATE_CLIENT_REQUEST))
  axios
    .post(`${url}/persons${tokenString}`, data)
    .then(res => {
      if(res.data.success) {
        dispatch(actionSucceed(CREATE_CLIENT_SUCCESS, res.data.data))
        history.push('/')
      } else {
        dispatch(actionFailed(CREATE_CLIENT_FAIL))
      }
    })
    .catch(err => {
      console.log('addClient err', err);
      dispatch(actionFailed(CREATE_CLIENT_FAIL))
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