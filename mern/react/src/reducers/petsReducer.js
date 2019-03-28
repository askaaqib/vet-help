import { SET_PETS_LIST, SELECT_PET } from '../actions/types';
// import isEmpty from '../is-empty';

const initialState = {
  petsList: {},
  selectedPet: null
}

export default function (state= initialState, action) {
  switch(action.type) {
    case SET_PETS_LIST:
      return {
          ...state,
          petsList: action.petsList
      }
    case SELECT_PET:
      return {
        ...state,
        selectedPet: action.selectedPet
      }
    default:
      return state;
  }
}