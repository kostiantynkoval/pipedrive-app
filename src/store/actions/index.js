import axios from 'axios'
import {
  GET_CLIENTS_REQUEST, GET_CLIENTS_SUCCESS, GET_CLIENTS_FAIL,
  GET_CLIENT_DETAILS_REQUEST, GET_CLIENT_DETAILS_SUCCESS, GET_CLIENT_DETAILS_FAIL,
  CLOSE_DETAILS_WINDOW, OPEN_DETAILS_WINDOW
} from './actionTypes'

const url = process.env.REACT_APP_API_URL
const tokenString = `?api_token=${process.env.REACT_APP_API_TOKEN}`

// Action Creators

export const getClients = () => dispatch => {
  dispatch(actionRequested(GET_CLIENTS_REQUEST))
  axios
    .get(`${url}/persons${tokenString}`)
    .then(res => {
      if(res.data.success) {
        dispatch(actionSucceed(GET_CLIENTS_SUCCESS, res.data.data))
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

  console.log('id', id);

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