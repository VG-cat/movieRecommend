const mongoose = require('mongoose');
const baseModel = require('./baseModel');
const { comment } = require('../controller/videoController');

const VideoSchema = new mongoose.Schema({
    ...baseModel,
    title: {
        type: String,
        required: true
    },
    descrption: {
        type: String,
        required: false,
    },
    category:{
        type: String,
        required: true
    },
    vodvideoid:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.ObjectId,
        required:true,
        ref:'User'
    },
    cover:{
        type:String,
        required:false 
    },
    comments:{
        type:Number,
        default:0
    },
    likeCount:{
        type:Number,
        default:0
    },
    collectCount:{
        type:Number,
        default:0
    },
    views:{
        type:Number,
        default:0
    },
    duration:{
        type:Number,
        default:0
    },
    playurl:{
        type:String,
        required:false
    }
   
}, {
    versionKey: false // You should be aware of the outcome after set to false
}
);

module.exports = mongoose.model('Video', VideoSchema);