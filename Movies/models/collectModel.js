const mongoose = require('mongoose');
const baseModel = require('./baseModel')

const collectSchema = new mongoose.Schema({
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
    iscollect:{
        type:String,
        default:0
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
}
);

module.exports = mongoose.model('Collect', collectSchema);