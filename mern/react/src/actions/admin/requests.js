import axios from 'axios';
import { GET_ERRORS, GET_ALL_REQUESTS, TOTAL_PAGES } from '../types';

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