const mongoose = require('mongoose');
const baseModel = require('./baseModel')

const SubscribeSchema = new mongoose.Schema({
    ...baseModel,
    user:{
        type:mongoose.ObjectId,
        required:true,
        ref:'User'
    },
    channel:{
        type:mongoose.ObjectId,
        required:true,
        ref:'User'
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
}
);

module.exports = mongoose.model('Subscribe', SubscribeSchema);