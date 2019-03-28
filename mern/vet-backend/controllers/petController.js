const validateProfileInput = require('../validation/createpet');
const validateChatRegisterInput = require('../validation/registerpetchat');
const Pet = require('../models/Pet')
const Chat = require('../models/Chat')
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads' })

var checkResponse;
export const createPet = async (req, res)  => {
	// upload.single(image)
	try{
		checkResponse = await validateProfileInput(req.body);
	}catch(error){
		res.json({"error": error})
	}

	const {errors, isValid} = checkResponse
    
	if(!isValid) {
		return res.status(400).json(errors);
	}

	
		const newPet = new Pet({
			name: req.body.name,
			type: req.body.type,
			age: req.body.age,
			breed: req.body.breed,
			_user: req.body.user
		});
		newPet.save()
			.then(Pet => {
				res.json(Pet)
			}); 
}

export const allPets = async (req, res) => {
		var userId = req.query.user_id
		Pet.find({ _user: userId }).then(Pet => {
			res.json(Pet)
		})
		// return res.json({"something": 'seomthig'});
}

export const registerPetChat = async (req, res)  => {
	// upload.single(image)
	try{
		checkResponse = await validateChatRegisterInput(req.body);
	}catch(error){
		res.json({"error": error})
	}

	const {errors, isValid} = checkResponse
    
	if(!isValid) {
		return res.status(400).json(errors);
	}
		const newChat = new Chat({
			problem: req.body.problem,
			problem_duration: req.body.problem_duration,
			eating: req.body.eating,
			weight: req.body.weight,
			_pet: req.body.pet
		});
		newChat.save()
			.then(Chat => {
				res.json(Chat)
			}); 
}