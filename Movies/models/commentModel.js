const mongoose = require('mongoose');
const baseModel = require('./baseModel')

const commentSchema = new mongoose.Schema({
    ...baseModel,
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
    content:{
        type:String,
        required:true,
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
}
);

module.exports = mongoose.model('Comment', commentSchema);