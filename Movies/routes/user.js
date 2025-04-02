const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const userController= require('../controller/userController')

const {registerValidator,validatorError,loginValidator, updateValidator} = require('../middleware/validator')
const {verifyToken} = require('../utils/jwt')
const multer = require('multer');

const upload = multer({dest: 'uploads/'});

Router
.post('/register',...registerValidator,validatorError,userController.register)
.post('/login',...loginValidator,validatorError,userController.login)
.post('/addInfo',verifyToken(),...updateValidator,validatorError,userController.addInfo)
.post('/addAvatar',verifyToken(),upload.single('avatar'),userController.addAvatar)
.get('/getDtail/:userid',verifyToken(false),userController.getDtail)
.get('/getsubscribelist',verifyToken(),userController.getsubscribelist)
.get('/getchannellist',verifyToken(),userController.getchannellist)
.get('/subscribe',verifyToken(),userController.subscribe)
.get('/unsubscribe',verifyToken(),userController.unsubscribe)
.get('/getrecvoid',verifyToken(),userController.getrecvoid)
module.exports =Router; 