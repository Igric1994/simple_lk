const express = require('express');
const authContoller = require('../controllers/authController');
const authRouter = express.Router();

authRouter.post('/signin', authContoller.signin);
authRouter.post('/logout', authContoller.logout);
authRouter.post('/signup', authContoller.reg);
authRouter.get('/', authContoller.getAuthPanel);

module.exports = authRouter;