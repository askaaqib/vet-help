// authentication.js
import axios from 'axios';
import { GET_ERRORS, SET_PETS_LIST } from './types';
// var multer  = require('multer')
// var upload = multer({ dest: 'public/uploads' })

export const createPetProfile = (pet, history) => dispatch => {
	axios.post('/api/createpet', pet).then(res => history.push('/pets'))
	.catch(err => {
		dispatch({
			type: GET_ERRORS
		});
	});
}

export const getAllPets = (history) => dispatch => {
	axios.get('/api/pets').then(res => {
		dispatch(setPetsList(res.data))
	})
}

export const setPetsList = petsList => {
	return {
			type: SET_PETS_LIST,
			petsList: petsList
	}
}