const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();
const editProfileMulter = require('../multers/patch-users-editProfile');

userRouter.patch('/editProfile/:id', editProfileMulter, userController.editProfile);
userRouter.get('/showcase', userController.showcase);
userRouter.get('/:id', userController.getPage);

module.exports = userRouter;