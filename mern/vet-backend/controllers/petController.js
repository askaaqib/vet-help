const validateProfileInput = require('../validation/createpet');
const Pet = require('../models/Pet')
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads' })

var checkResponse;
export const create = async (req, res)  => {
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
			image: req.files.image
		});
		newPet.save()
			.then(Pet => {
				res.json(Pet)
			}); 
}
