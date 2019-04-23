import axios from 'axios';
import { GET_ERRORS, GET_ALL_USERS, TOTAL_PAGES } from '../types';

export const getAllUsers = (page) => dispatch => {
  axios.get('/api/getAllUsers', {
    params: {
      page: page
    }
    })
    .then(res => {
      // console.log(res.data)
      // var  userList = res.data.message;
      // var totalpage = res.data.pages
        dispatch(setAllUser(res.data));
        // dispatch(totalPage(totalpage))
    })
    .catch(err => {
      if(err) {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      }
    });
}

export const setAllUser = userList => {
   
  return {
      type: GET_ALL_USERS,
      payload:userList
  }
}

export const totalPage = totalpage => {
   
  return {
      type: TOTAL_PAGES,
      payload:totalpage
  }
}