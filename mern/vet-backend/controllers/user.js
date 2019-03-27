const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User')
const Pusher = require('pusher');


var checkResponse;
export const register = async (req, res)  => {
    
    try{

      checkResponse = await validateRegisterInput(req.body);
       
    }catch(error){
        res.json({"error": error})
    }

    const {errors, isValid} = checkResponse
    

    if(!isValid) {
        console.log('coming')
        return res.status(400).json(errors);
    }
    
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    }).catch( error => {
        console.error( 'onRejected function called: ' + error );
      })
}


export const  login = (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
}


export const requestHelp = (req, res) => {
    console.log(req)
    // let socket_id = req.body.socket_id
    // let channelName = req.body.channel_name
    // let name = req.body.name

    // var pusher = new Pusher({
    //     appId: '745676',
    //     key: '92e8a4cbd51aaee54132',
    //     secret: '60c1fec3508f2681a5da',
    //     cluster: 'ap2',
    //     encrypted: true
    //   });


    // var presence_data = new Array();
    // presence_data.name = name;

    // let key = pusher.authenticate(socket_id, channelName, presence_data)
    
    res.json({'value':'hi'})
}

// passport.authenticate('jwt', { session: false }),
export const me = (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
}

// router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
//     return res.json({
//         id: req.user.id,
//         name: req.user.name,
//         email: req.user.email
//     });
// });