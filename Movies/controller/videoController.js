var RPCClient = require('@alicloud/pop-core').RPCClient;
const { videoModel, commentModel, likeModel, subscribeModel ,collectModel} = require('../models');
const {hotInc,tophot} = require('../utils/redis')
const mongoose = require('mongoose');
const lodash = require('lodash')
const {AccessKeyId,AccessKeySecret} = require('../config.json')

function initVodClient(accessKeyId, accessKeySecret,) {
    var regionId = 'cn-shanghai';   // 点播服务接入地域
    var client = new RPCClient({//填入AccessKey信息
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
        apiVersion: '2017-03-21'
    });

    return client;
}

exports.list = async (req, res) => {
    let { pageNum = 1, pageSize = 5 } = req.query
    pageNum = parseInt(pageNum)
    pageSize = parseInt(pageSize)
    // console.log(pageNum,pageSize);
    let videolist = await videoModel.find().skip((pageNum - 1) * pageSize).limit(pageSize).sort({ createTime: -1 }).populate('user', 'id username image')
    total = await videoModel.countDocuments()
    res.status(200).json({ list: videolist, total })
}

exports.getVod = async (req, res) => {

    let client = initVodClient( // 这里就是传入创建rma账号的id和secret
        AccessKeyId,
        AccessKeySecret,
    );
    const vodback = await client.request("CreateUploadVideo", {
        "Title": req.body.title,
        "FileName": req.body.fileName,
    }, {});

    res.status(200).json({ vod: vodback })

}
exports.createVideo = async (req, res) => {
    try {
        const body = req.body
        body.user = req.user._id
        body._id = new mongoose.Types.ObjectId()
        // console.log(body);
        let client = initVodClient( // 这里就是传入创建rma账号的id和secret
            AccessKeyId,
            AccessKeySecret,
        );
        const vodback = await client.request("GetPlayInfo", {
            "VideoId": req.body.VideoId,
        }, {});
        body.duration = vodback.Duration
        body.cover = vodback.CoverURL
        body.playurl = vodback.PlayInfoList.PlayInfo.PlayURL
        const video = await new videoModel(body)
        video.save()
        res.status(200).json(video);
    } catch (error) {
        res.status(501).json({ err: error });
    }
}

exports.getDetail = async (req, res) => {
    const { videoid } = req.params
    let video = await videoModel.findById(videoid).populate('user', 'id username image')
    video = video.toJson()
    video.isSubscribe =false
    video.isCollect =false
    video.rate = 0
    if (req.user) {
        const userid = req.user._id
        like = likeModel.findOne({
            user: userid,
            video: videoid,
        })
        if (like) {
            video.rate = like.rate
        }
        subscribe =await subscribeModel.findOne({
            user: userid,
            channel: video.user._id,
        })
        if(subscribe){
            video.isSubscribe =true
        }
        collect =await collectModel.findOne({
            user: userid,
            video: videoid,
        })
        if(collect){
            video.isCollect =true
        }
    }
    await hotInc(videoid,1)
    res.status(200).json(video);
}

exports.addcomment = async (req, res) => {
    try {
        const videoid = req.params.videoid
        const video = await videoModel.findById(videoid)
        if (video) {
            await new commentModel({
                user: req.user._id,
                video: videoid,
                // rate: req.body.rate ? req.body.rate : 5,
                content: req.body.content
            }).save()

            video.comments++
            await video.save()
            await hotInc(videoid,2)
            return res.status(200).json(video);
        }
        res.status(404).json({ err: '该电影不存在' });

    } catch (error) {
        res.status(501).json({ err: error });
    }
}


exports.getcommentlist = async (req, res) => {
    try {
        const videoid = req.params.videoid
        const videolist = await commentModel.find({ video: videoid }).populate('user').populate('video')
        const total = await commentModel.countDocuments({ video: videoid })
        res.status(200).json({
            list: videolist,
            total,
        });

    } catch (error) {
        res.status(501).json({ err: error });
    }
}

exports.deletecomment = async (req, res) => {
    try {
        const commentid = req.params.commentid
        const comment = await commentModel.findById(commentid)
        if (comment) {
            await comment.remove()
            video = await videoModel.findById(comment.video)
            video.comments--
            await video.save()
            return res.status(200).json({
                message: '删除成功'
            });
        }
        res.status(404).json({
            message: '评论不存在'
        });

    } catch (error) {
        res.status(501).json({ err: error });
    }
}
exports.like = async (req, res) => {
    try {
        const videoid = req.params.videoid
        const video = await videoModel.findById(videoid)
        const like = await likeModel.find({
            video: videoid,
            user: req.user._id,
        })
        if (video && like.length == 0) {
            await new likeModel({
                user: req.user._id,
                video: videoid,
                rate: req.query.rate,
            }).save()

            video.likeCount++
            await video.save()
            await hotInc(videoid,parseInt(req.query.rate)*0.6)
            return res.status(200).json({ 'message': '评分成功' });
        } else if (video && like) {
            await like.update({
                user: req.user._id,
                video: videoid,
                rate: req.query.rate,
            }).save()
            return res.status(405).json({ err: '已评分' });
        }
        res.status(404).json({ err: '该电影不存在' });

    } catch (error) {
        res.status(501).json({ err: error });
    }
}
exports.likelist = async (req, res) => {
    try {
        const like = await likeModel.find({
            user: req.user._id,
        }).populate('video')
        res.status(200).json(like);

    } catch (error) {
        res.status(501).json({ err: error });
    }
}
exports.addcollect = async (req, res) => {
    try {
        const videoid = req.params.videoid
        const video = await videoModel.findById(videoid)
        const collect = await collectModel.findOne({
            video: videoid,
            user: req.user._id,
        })
        if (video && !collect) {
            await new collectModel({
                user: req.user._id,
                video: videoid,
                iscollect: 1
            }).save()
            video.collectCount++
            await video.save()
            await hotInc(videoid,3)
            return res.status(200).json({ 'message': '收藏成功' });
        } else if (video && collect) {
            await collect.remove()
            video.collectCount--
            await hotInc(videoid,-2.7)
            await video.save()
            return res.status(200).json({ 'message': '取消收藏' });
        }
        res.status(404).json({ err: '该电影不存在' });

    } catch (error) {
        res.status(501).json({ err: error });
    }
}
exports.collectlist = async (req, res) => {
    try {
        const collect = await collectModel.find({
            user: req.user._id,
        }).populate('video')
        res.status(200).json(collect);

    } catch (error) {
        res.status(501).json({ err: error });
    }
}


exports.hotlist = async (req, res) => {
    try {
        const num= req.params.num
        let obj = await tophot(num)
        const videoIds = Object.keys(obj);
        // 使用 Promise.all 等待所有异步操作完成
        const videos = await Promise.all(
            videoIds.map(async (videoId) => {
                const video = await videoModel.findById(videoId).populate('user', 'id username image');
                return video;
            })
        );
        res.status(200).json(videos);

    } catch (error) {
        res.status(501).json({ err: error });
    }
}