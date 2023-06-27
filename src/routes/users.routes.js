const express = require('express');

//* middlewares/controllers

const validationMiddleware = require('../middlewares/validations.middleware');
const usersController = require('./../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.contoller');
const router = express.Router();
router.post(
  '/login',
  validationMiddleware.createUserValidation,
  authController.login
);

router
  .route('/')
  .get(authMiddleware.restrictTo('employee'), usersController.findAll)
  .post(usersController.create);

router
  .route('/:id')
  .get(authMiddleware.restrictTo('employee'), usersController.findUser)
  .patch(
    authMiddleware.restrictTo('employee'),
    authMiddleware.protectAccountOwner,
    usersController.updateUser
  )
  .delete(
    authMiddleware.restrictTo('employee'),
    authMiddleware.protectAccountOwner,
    usersController.deleteUser
  );

module.exports = router;
