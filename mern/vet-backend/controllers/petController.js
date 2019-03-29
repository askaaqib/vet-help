const validateProfileInput = require('../validation/createpet');
const validateChatRegisterInput = require('../validation/registerpetchat');
const Pet = require('../models/Pet')
const Chat = require('../models/Chat')
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads' })
const formidable = require('formidable');
var fs = require('fs');

var checkResponse;
/******************* CREATE PET METHOD *******************/
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
	var filename = ''
	if (req.files.image) {
		var oldpath = req.files.image.file
		filename = Date.now() + '-' + req.files.image.filename
		var newpath = '../react/public/images/pets/' + filename
	}
	
	const newPet = new Pet({
		name: req.body.name,
		type: req.body.type,
		age: req.body.age,
		breed: req.body.breed,
		image: filename,
		_user: req.body.user
	});

	newPet.save()
		.then(Pet => {
			res.json(Pet)
			if (req.files.image) {
				fs.createReadStream(oldpath);
				var readerStream = fs.createReadStream(oldpath);
				var writerStream = fs.createWriteStream(newpath);
				readerStream.pipe(writerStream);
			}
		}); 
}

/******************* DELETE PET METHOD *******************/
export const deletePet = async (req, res) => {
	var petId = req.body.id
	var petImage = req.body.image
	Pet.remove({ _id: petId}).then(pet => {
		if (petImage) {
			fs.unlink('../react/public/images/pets/' + petImage)
		}
		res.json(pet)
	})
}

/******************* SHOW ALL PETS METHOD *******************/
export const allPets = async (req, res) => {
		var userId = req.query.user_id
		Pet.find({ _user: userId }).then(Pet => {
			res.json(Pet)
		})
		// return res.json({"something": 'seomthig'});
}

/******************* REGISTER PET FOR CHAT WITH VET METHOD *******************/
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