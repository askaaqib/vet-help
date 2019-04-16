const validateProfileInput = require('../validation/createpet');
const validateChatRegisterInput = require('../validation/registerpetchat');
const Pet = require('../models/Pet')
const Chat = require('../models/Chat')
const Busboy = require('busboy')
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads' })
const formidable = require('formidable');
var fs = require('fs');

var checkResponse;

/******************* CREATE PET METHOD *******************/
export const createPet = async (req, res)  => {
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

/******************* UPDATE PET METHOD *******************/
export const updatePet = async (req, res)  => {
	try{
		checkResponse = await validateProfileInput(req.body);
	}catch(error){
		res.json({"error": error})
	}
	const {errors, isValid} = checkResponse
    
	if(!isValid) {
		return res.status(400).json(errors);
	}
	
	const toUpdate = {
		_id: req.body.id,
		name: req.body.name,
		type: req.body.type,
		age: req.body.age,
		breed: req.body.breed
		};

	if (req.body.imageEdit) {
		if (req.files.image) {
			var oldpath = req.files.image.file
			filename = Date.now() + '-' + req.files.image.filename
			var newpath = '../react/public/images/pets/' + filename
			toUpdate.push({ image: filename })
		}
	}

	Pet.findById(req.body.id, function(err, pet) {
    if (!pet)
			res.status(404).send("data is not found");
		else {
				pet.name = req.body.name;
				pet.breed = req.body.breed;
				pet.age = req.body.age;
        pet.save().then(pet => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
	})
	
}
/********* GET PET BY ID / PET DETAILS BY ID METHOD ********/
export const petById = async (req, res) => {
	var petId = req.query.id
	Pet.find({ _id: petId }).then(Pet => {
		res.json(Pet)
	})
	// return res.json({"something": 'seomthig'});
}

/******************* DELETE PET METHOD *******************/
export const deletePet = async (req, res) => {
	var petId = req.body.id
	var petImage = req.body.image
	Pet.remove({ _id: petId}).then(pet => {
		if (petImage) {
			fs.unlinkSync('../react/public/images/pets/' + petImage)
		}
		res.json(pet)
	})
}

/******************* SHOW ALL PETS METHOD *******************/
export const allPets = async (req, res) => {
		var userId = req.query.user_id
		Pet.find({ _user: userId }).populate('_chat').exec(function (err, pet) {
			if (err) return handleError(err);
			res.json(pet)
		})
		// return res.json({"something": 'seomthig'});
}

/******************* REGISTER PET FOR CHAT WITH VET METHOD *******************/
export const registerPetChat = async (req, res)  => {
	try{
		checkResponse = await validateChatRegisterInput(req.body);
	}catch(error){
		res.json({"error": error})
	}
	
	const {errors, isValid} = checkResponse
	if(!isValid) {
		return res.status(400).json(errors);
	}
	// upload.single(image)

	if (req.body.images) {
		var Images = JSON.parse(req.body.images)
		Images.map((image, index) => {
			var filename = Date.now() + '-' + image.path
			filename = filename.replace(/\s+/g, '-').toLowerCase();
			var newpath = '../react/public/images/chats/' + filename
			var img = image.buffer
			var data = img.replace(/^data:image\/\w+;base64,/, "");
			var buf = Buffer.from(data, 'base64');
			fs.writeFile(newpath, buf, 'base64', function (err) {});
			image.name = filename
			delete(image.path);
			delete(image.preview);
			delete(image.buffer);
		})
	}	

	req.body.images = Images	
	
	var videoname = ''
	if (req.files.videos) {
		var oldpath = req.files.videos.file
		videoname = Date.now() + '-' + req.files.videos.filename
		videoname = videoname.replace(/\s+/g, '-').toLowerCase();
		var newpath = '../react/public/images/chats/' + videoname
		fs.createReadStream(oldpath);
		var readerStream = fs.createReadStream(oldpath);
		var writerStream = fs.createWriteStream(newpath);
		readerStream.pipe(writerStream);
	}	

	const newChat = new Chat({
		problem: req.body.problem,
		problem_duration: req.body.problem_duration,
		eating: req.body.eating,
		weight: req.body.weight,
		images: req.body.images,
		videos: videoname,
		_pet: req.body.pet
	});

	newChat.save()
		.then(Chat => {
			/********** PUSH INTO PET ChATS ARRAY **********/
			Pet.findById(req.body.pet, function(err, pet) {
				if (!pet)
					res.status(404).send("data is not found");
				else {
					pet._chat.push(Chat);
					pet.save().then(pet => {
						res.json(Chat)
					})
					.catch(err => {
						res.status(400).send("unable to update the database");
					});
				}
			})
		});
}

/******************* GET PETS NOTES METHOD *******************/
export const petNotes = async (req, res) => {
	var petId = req.query.id
	Pet.findById(petId).populate('_chat').then(pet => {
		res.json(pet)
	}).catch(err => {
		res.status(400).send("Bad Request");
	});
}
