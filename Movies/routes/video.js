const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const videoController= require('../controller/videoController')
const {verifyToken} = require('../utils/jwt')
const {videoValidator,validatorError} = require('../middleware/validator')

Router.get('/list',videoController.list)
Router.post('/getvod',videoController.getVod)
Router.get('/getDetail/:videoid',verifyToken(false),videoController.getDetail)
Router.post('/createVideo',verifyToken(),...videoValidator,validatorError,videoController.createVideo)
Router.post('/addcomment/:videoid',verifyToken(),videoController.addcomment)
Router.get('/getcommentlist/:videoid',verifyToken(),videoController.getcommentlist)
Router.get('/delcomment/:commentid',verifyToken(),videoController.deletecomment)
Router.get('/like/:videoid',verifyToken(),videoController.like)
Router.get('/likelist',verifyToken(),videoController.likelist)
Router.get('/addcollect/:videoid',verifyToken(),videoController.addcollect)
Router.get('/collectlist',verifyToken(),videoController.collectlist)
Router.get('/hotlist/:num',videoController.hotlist)

module.exports =Router;