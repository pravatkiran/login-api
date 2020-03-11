const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
// const isAuth = require('../util/is-auth');

router.get('/:database/user', userController.getUser);

router.post('/:database/user/create', userController.postUser);

router.get('/:database/user/:id', userController.getUserById);

router.put('/:database/user/:id', userController.updateUser);

router.delete('/:database/user/:id', userController.deleteUser);

router.get('/:database/emails', userController.getEmailList);

module.exports = router;


// isAuth middleware for validating jwt using expressjwt middleware in app.js instead of custom isAuth middleware