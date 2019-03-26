// authentication.js
import axios from 'axios';
import { GET_ERRORS } from './types';
// var multer  = require('multer')
// var upload = multer({ dest: 'public/uploads' })

export const createPetProfile = (pet, history) => dispatch => {
	axios.post('/api/createpet', pet, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}).then(res => history.push('/pets'))
	.catch(err => {
		dispatch({
			type: GET_ERRORS
		});
	});
}
