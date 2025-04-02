const mongoose = require('mongoose');
const md5 = require('../utils/md5');
const baseModel = require('./baseModel')

const UserSchema = new mongoose.Schema({
    ...baseModel,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set:value => md5(value),
        select: false
    },

    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    region: {
        type: String,

    },
    phone: {
        type: String,

    },
    avatar: {
        type: String,
        default:'uploads\\f6219a06ec0c48d82849e2a54c2f424c.jpeg'
    },
    cover:{
        type:String,
    },
    channels:{
        type: String,
    },
    followers:{
        type: Number,
        default:0
    },
}, {
    versionKey: false // You should be aware of the outcome after set to false
}
);

module.exports = mongoose.model('User', UserSchema);