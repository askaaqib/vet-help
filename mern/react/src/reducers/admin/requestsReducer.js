import { GET_ALL_REQUESTS, TOTAL_PAGES } from '../../actions/types';
// import isEmpty from '../is-empty';

const initialState = {
  requestList: [],
  totalpage: null,
}

export default function (state= initialState, action) {
  switch(action.type) {
    case GET_ALL_REQUESTS:
      return {
          ...state,
          requestList: action.payload
      }
    case TOTAL_PAGES:
      return {
        ...state,
        totalpage: action.payload
      }
    default:
      return state;
  }
}