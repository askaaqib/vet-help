import { GET_ALL_REQUESTS, TOTAL_PAGES, REQUEST_HELP_PENDING, GET_REQUEST_DETAILS } from '../../actions/types';
// import isEmpty from '../is-empty';

const initialState = {
  requestList: [],
  pendingRequestList: null,
  totalpage: null,
  requestDetails: null
}

export default function (state= initialState, action) {
  switch(action.type) {
    case GET_ALL_REQUESTS:
      return {
          ...state,
          requestList: action.payload
      }
    case REQUEST_HELP_PENDING:
      return {
          ...state,
          pendingRequestList: action.pendingRequestList
      }
    case GET_REQUEST_DETAILS:
      return {
        ...state,
        requestDetails: action.payload
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