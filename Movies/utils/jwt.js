const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const { promisify } = require('util');
const tojwt = promisify(jwt.sign);
const toverify = promisify(jwt.verify);
const {userModel} = require('../models')

module.exports.createToken = async (user) => {
    const token = await tojwt({ user }, '2b3e67d5-3a7d-42a2-ad11-5f7a7ab9db78', { expiresIn: '1h' });
    return token;
}

module.exports.verifyToken = (required = true) => {
    return async (req, res, next) => {
        let token = req.headers.authorization;
        token = token ? token.replace('Bearer ', '') : null;
        if (token) {
            try {
                const user = await toverify(token, '2b3e67d5-3a7d-42a2-ad11-5f7a7ab9db78');
                // console.log(user);
                const newUser = await userModel.findById(user.user._id)
                req.user = newUser;
                next();
            } catch (error) {
                return res.status(402).json({ 'message': '用户token验证失败' });
            }
        }else if(required){
            return res.status(402).json({ 'message': '用户token验证失败' });
        }else {
            next();
        }
    }
}

