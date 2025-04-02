const {body,validationResult} = require('express-validator');
const { userModel } = require('../models');


module.exports = {
    validatorError: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array()});
        }
        next();
    },
    registerValidator: [
        body('username').notEmpty().withMessage('用户名不能为空').bail()
        .isLength({min: 3}).withMessage('用户名长度不能小于3'),
        body('password').notEmpty().withMessage('密码不能为空').bail()
        .isLength({min: 6}).withMessage('密码长度不能小于6'),  
        body('email').notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式不正确').bail()
        .custom((value) => {
            return  userModel.findOne({email: value}).then(user => {
                if (user) {
                    return Promise.reject('邮箱已被注册')
                }
            })
        })
    ],
    loginValidator: [
        body('email').notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式不正确'),
        body('password').notEmpty().withMessage('密码不能为空').bail()
    ],
    updateValidator: [
        body('username').notEmpty().withMessage('用户名不能为空').bail()
        .isLength({min: 3}).withMessage('用户名长度不能小于3'),
        body('password').notEmpty().withMessage('密码不能为空').bail()
        .isLength({min: 6}).withMessage('密码长度不能小于6'),  
        body('email').notEmpty().withMessage('邮箱不能为空').bail()
        .isEmail().withMessage('邮箱格式不正确').bail()
        .custom((value) => {
            return  userModel.findOne({email: value}).then(user => {
                if (user) {
                    return Promise.reject('邮箱已被注册')
                }
            })
        }),
        body('phone').isMobilePhone().withMessage('手机号格式不正确').bail()
        .custom((value) => {
            return  userModel.findOne({phone: value}).then(user => {
                if (user) {
                    return Promise.reject('手机号已被注册')
                }
            })
        })
    ],
    videoValidator: [
        body('title').notEmpty().withMessage('标题不能为空').bail()
        .isLength({min: 3}).withMessage('标题长度不能小于3'),
        body('vodvideoid').notEmpty().withMessage('vodid不能为空'), 

    ],

}
 