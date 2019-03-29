// authentication.js
import axios from 'axios';
import { GET_ERRORS, SET_PETS_LIST, SELECT_PET } from './types';
// var multer  = require('multer')
// var upload = multer({ dest: 'public/uploads' })

export const createPetProfile = (pet, history) => dispatch => {
const config = { headers: { 'Content-Type': 'multipart/form-data' } };

// Display the key/value pairs
for (var pair of pet.entries()) {
	console.log(pair[0]+ ', ' + pair[1]); 
}

fetch('/api/createpet', {
	mode: 'no-cors',
	method: "POST",
	body: pet
}).then(res => {}
			// history.push('/pets')
			
			)
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err
			});
		});
	}
export const registerPetChat = (pet, history) => dispatch => {
	axios.post('/api/registerpetchat', pet).then(res => history.push('/pets'))
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err
			})
		})
}

export const getAllPets = (userId, history) => dispatch => {
	axios.get('/api/pets', {
		params: {
			user_id: userId
		}
	}).then(res => {
		dispatch(setPetsList(res.data))
	})
}

export const setPetsList = petsList => {
	return {
		type: SET_PETS_LIST,
		petsList: petsList
	}
}
export const setSelectedPet = (pet, history) => dispatch => {
	dispatch(assignSelectedPet(pet))
}
export const assignSelectedPet = selectedPet => {
	return {
		type: SELECT_PET,
		selectedPet: selectedPet
	}
}