const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();
const upload = require('../multers/patch-users-editProfile');

userRouter.patch('/editProfile/:id', upload.none(), userController.editProfile);
userRouter.patch('/savePhoto/:id', upload.single('photo'), userController.savePhoto);
userRouter.get('/showcase', userController.showcase);
userRouter.get('/img', userController.img);
userRouter.get('/:id', userController.getPage);

module.exports = userRouter;