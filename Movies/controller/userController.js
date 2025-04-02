const mongoose = require('mongoose');
const { userModel, subscribeModel } = require('../models');
const { createToken } = require('../utils/jwt')
const { upload } = require('../utils/upload')
const { getrecommend } = require('../utils/rpc')
const lodash = require('lodash')
const { getGeolocation } = require('../utils/region')

exports.login = async (req, res) => {
    try {
        const user = await userModel.findOne(req.body)
        const ip = req.headers['x-forwarded-for'] || req.ip;
        const geolocation = await getGeolocation(ip);
        if (user) {
            let user1 = user.toJSON();
            user1.region = geolocation
            user1.token = await createToken(user1);
            res.status(200).json(user1);
        } else {
            res.status(402).json({ 'message': '密码或用户名错误' });
        }
    }
    catch (error) {
        res.status(501).json({ error: error });
    }
}

exports.register = async (req, res) => {
    try {
        console.log(req.body);
        const ip = req.headers['x-forwarded-for'] || req.ip;
        const geolocation = await getGeolocation(ip);
        const user = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            // region: geolocation,
        })
        console.log(user);
        await user.save()

        user.token = await createToken(user);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(501).json({ error: error });
    }
}

exports.addInfo = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true })
        res.status(200).json({ 'message': '添加信息成功' });
    }
    catch (err) {
        res.status(501).json({ error: err });

    }

}

exports.addAvatar = async (req, res) => {
    try {
        // console.log(req.body.avatar);
        try {
            imgurl = upload(req);
        } catch (error) {
            imgurl = 'uploads\\f6219a06ec0c48d82849e2a54c2f424c.jpeg'
        }
        console.log(imgurl);
        req.body = { ...req.body, avatar: imgurl }
        const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true })
        res.status(200).json({ 'message': '添加头像成功' });

    }
    catch (err) {
        res.status(501).json({ error: err });

    }

}

exports.subscribe = async (req, res) => {
    const userid = req.user._id
    const channelid = req.query.channelid
    if (userid === channelid) {
        return res.status(401).json({ 'err': '不能关注自己' })
    }
    const record = await subscribeModel.findOne(
        {
            user: userid,
            channel: channelid
        }
    )
    // console.log(channelid);
    if (record) {
        res.status(401).json({ 'err': '已经订阅了此频道' })
    } else {
        await new subscribeModel({
            user: userid,
            channel: channelid
        }).save()
        const user = await userModel.findById(channelid)
        user.followers++
        await user.save()

        res.status(200).json({ 'message': '关注成功' })
    }
}

exports.unsubscribe = async (req, res) => {
    const userid = req.user._id
    const channelid = req.query.channelid
    if (userid === channelid) {
        return res.status(401).json({ 'err': '不能取关自己' })
    }
    const record = await subscribeModel.findOne(
        {
            user: userid,
            channel: channelid
        }
    )
    // console.log(channelid);
    if (!record) {
        res.status(401).json({ 'err': '没有关注此频道' })
    } else {
        await record.remove()
        const user = await userModel.findById(channelid)
        user.followers--
        await user.save()
        res.status(200).json({ 'message': '取关成功' })
    }
}

exports.getDtail = async (req, res) => {
    let isSubscribe = false
    if (req.user) {
        const record = await subscribeModel.findOne({
            channel: req.params.userid,
            user: req.user._id
        })

        if (record) {
            isSubscribe = true
        }
    }
    const user = await userModel.findById(req.params.userid)
    user.isSubscribe = isSubscribe
    res.status(200).json({ ...lodash.pick(user, ['id', 'username', 'image', 'followers', 'channels']), isSubscribe })
}

// 获取关注列表
exports.getsubscribelist = async (req, res) => {
    const record = await subscribeModel.find({
        user: req.user._id
    }).populate('channel', ['id', 'username', 'image', 'followers'])
    res.status(200).json(record.map(item => {
        return item.channel
    }))
}
// 获取粉丝列表
exports.getchannellist = async (req, res) => {
    const record = await subscribeModel.find({
        channel: req.user._id
    }).populate('user', ['id', 'username', 'image', 'followers'])
    res.status(200).json(record.map(item => {
        return item.user
    }))
}
// rpc调用python模型
exports.getrecvoid = async (req, res) => {
    const recommendlist = getrecommend(req.user._id)
    res.status(200).json(recommendlist)
}