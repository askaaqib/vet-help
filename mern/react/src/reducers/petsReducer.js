import { SET_PETS_LIST } from '../actions/types';
// import isEmpty from '../is-empty';

const initialState = {
  petsList: {}
}

export default function (state= initialState, action) {
  switch(action.type) {
    case SET_PETS_LIST:
      return {
          ...state,
          petsList: action.petsList
      }
    default:
      return state;
  }
}