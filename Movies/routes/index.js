const express = require('express');
const Router= express.Router()

const videoRouter = require('./video')
const userRouter = require('./user')

Router
.use('/video',videoRouter)
.use('/user',userRouter)

module.exports = Router