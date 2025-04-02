const mongoose = require('mongoose');
module.exports =
{
    _id: {
        type: String,
        required: true,
        default:new mongoose.Types.ObjectId()
    },
    createTime: {
        type: Date,
        default: Date.now(),
        select: true
    },
    updateTime: {
        type: Date,
        default: Date.now(),
        select: false
    }
};