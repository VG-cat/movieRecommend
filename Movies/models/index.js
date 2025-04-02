const {connectDB} = require('../utils/mongodb');
const {redis} = require('../utils/redis')

connectDB.connect()
module.exports = {
    userModel: require('./userModel'),
    videoModel:require('./videoModel'),
    subscribeModel:require('./subscribeModel'),
    commentModel:require('./commentModel'),
    likeModel:require('./likeModel'),
    collectModel:require('./collectModel')
};