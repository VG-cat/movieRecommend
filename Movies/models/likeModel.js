const mongoose = require('mongoose');
const baseModel = require('./baseModel')

const likeSchema = new mongoose.Schema({
    ...baseModel,
    rate: {
        type: String,
        required: true
    },
    video:{
        type:mongoose.ObjectId,
        required:true,
        ref:'Video'
    },
    user:{
        type:mongoose.ObjectId,
        required:true,
        ref:'User'
    },
}, {
    versionKey: false // You should be aware of the outcome after set to false
}
);

module.exports = mongoose.model('Like', likeSchema);