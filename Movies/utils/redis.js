const Redis = require('ioredis')
const host = '127.0.0.1'
const redis = new Redis(6379,host)

redis.on('error',err => {
    if(err){
        console.log('Redis 连接错误');
        console.log({error:err});
        redis.quit()
    }    
})

redis.on('ready',msg => {
    console.log(`Redis Connected: ${host}`);
})


const hotInc = async (videoid,incnum) => {
    var data = await redis.zscore('videohot',videoid)
    if(data){
        var inc = await redis.zincrby('videohot',incnum,videoid)
    }else{
        var inc = await redis.zadd('videohot',incnum,videoid)
    }
    return inc
}

const tophot = async (num=10) => {
    var list = await redis.zrevrange('videohot',0,-1,'withscores')
    
    newlist = list.slice(0,num * 2)
    let obj = {}
    for(let i =0 ; i<newlist.length; i++){
        if(i %2 == 0){
            obj[newlist[i]] = newlist[i+1]
        }
    }
    // console.log(obj);
    return obj
}


exports.hotInc = hotInc
exports.tophot = tophot