import { GET_ALL_USERS, TOTAL_PAGES } from '../../actions/types';
// import isEmpty from '../is-empty';

const initialState = {
  userList: [],
  totalpage: null,
}

export default function (state= initialState, action) {
  switch(action.type) {
    case GET_ALL_USERS:
      return {
          ...state,
          userList: action.payload
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