// ./express-server/routes/todo.server.route.js
import express from 'express';
//import controller file
import passport from 'passport';
// import * as todoController from '../controllers/vet.server.controller';
import * as UserController from '../controllers/user';
import * as PetController from '../controllers/petController';
// get an instance of express router

const router = express.Router();
// router.route('/')
//      .get(todoController.getTodos)
//      .post(todoController.addTodo)
//      .put(todoController.updateTodo);
// router.route('/:id')
//       .get(todoController.getTodo)
//       .delete(todoController.deleteTodo);
router.route('/pusher/auth').post(UserController.requestHelp);
router.route('/register').post(UserController.register);
router.route('/login').post(UserController.login);
router.route('/me').get(passport.authenticate('jwt', { session: false }), UserController.me);

/************* PET ROUTES *************/
router.route('/createpet').post(PetController.createPet);
router.route('/pets').get(PetController.allPets);
router.route('/registerpetchat').post(PetController.registerPetChat);
router.route('/deletepet').post(PetController.deletePet);
<<<<<<< HEAD
// router.route('/pet:id').get(PetController.editPet)
router.route('/getAllusers').get(UserController.getAllUsers);
||||||| merged common ancestors
// router.route('/pet:id').get(PetController.editPet)
=======
router.route('/petshow').get(PetController.petById)
router.route('/updatepet').post(PetController.updatePet);
/************* PET ROUTES *************/
>>>>>>> c77972e3bbd183d131616e1d7490b20298f14dbe
export default router;