// authentication.js
import axios from 'axios';
import { GET_ERRORS, SET_PETS_LIST, SELECT_PET } from './types';
// var multer  = require('multer')
// var upload = multer({ dest: 'public/uploads' })

/********* CREEATE PET PROFILE *********/
export const createPetProfile = (pet, history) => dispatch => {
<<<<<<< HEAD
	axios.post('/api/createpet', pet).then(res => {
		history.push('/pets')
	})
	.catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	});
}
/********* DELETE SELECTED PET *********/
export const deleteSelectedPet = (pet, history) => dispatch => {
	axios.post('/api/deletepet', pet).then(res => {
		history.push('/pets')
	})
}

/********* PET REGISTER FOR SELECTED PET *********/
=======
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
>>>>>>> d27464300f6ccb39b63ad6ea21115faedb69571c
export const registerPetChat = (pet, history) => dispatch => {
	axios.post('/api/registerpetchat', pet).then(res => history.push('/pets'))
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		})
}

/********* GET ALL PETS METHOD *********/
export const getAllPets = (userId, history) => dispatch => {
	axios.get('/api/pets', {
		params: {
			user_id: userId
		}
	}).then(res => {
		dispatch(setPetsList(res.data))
	})
}



export const setSelectedPet = (pet, history) => dispatch => {
	dispatch(assignSelectedPet(pet))
}
/*******************************************/
/******** DISPATCH METHODS HERE ************/
/*******************************************/

/********  SELECTED PET DISPATCH ********/
export const assignSelectedPet = selectedPet => {
	return {
		type: SELECT_PET,
		selectedPet: selectedPet
	}
}

/********  PETS LIST DISPATCH ********/
export const setPetsList = petsList => {
	return {
		type: SET_PETS_LIST,
		petsList: petsList
	}
}