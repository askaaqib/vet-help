import axios from 'axios';
import { GET_ERRORS, GET_ALL_REQUESTS, TOTAL_PAGES, GET_REQUEST_DETAILS } from '../types';

export const getAllRequests = () => dispatch => {
  axios.get('/api/getAllrequests')
    .then(res => {
      // console.log(res.data)
      var  requestList = res.data.message;
      var totalpage = res.data.pages
        dispatch(setAllRequest(requestList));
        dispatch(totalPage(totalpage))
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

/************ UPLOAD NOTES METHOD ************/
export const uploadNotes = (data) => dispatch => {
  axios.post('api/uploadNotes', data).then(res => {
    // console.log(this.state)
  })
}

/************ UPDATE REQUEST METHOD ************/
export const updateRequestStatus = (data) => dispatch => {
  axios.post('api/updateRequestStatus', data).then(res => {
    // console.log(this.state)
  })
}

/************ GET REQUEST DETAILS METHOD ************/
export const getRequestDetails = (id) => dispatch => {
  axios.get('api/getRequestById', {
    params: {
      id: id
    }
  }).then(res => {
    dispatch({
      type: GET_REQUEST_DETAILS,
      payload: res.data
    })
    // console.log(res)
  })
}

/************ DISPATCH METHODS ************/
export const setAllRequest = requestList => {
  return {
    type: GET_ALL_REQUESTS,
    payload:requestList
  }
}

export const totalPage = totalpage => {
  return {
    type: TOTAL_PAGES,
    payload:totalpage
  }
}
/************ DISPATCH METHODS ************/