const jayson = require('jayson');
const client = jayson.client.http({
  port: 8080,
});
const getrecommend = async (userid) => {
    console.log(userid);
    client.request('grouprecommend', [userid], (err,response) => {
        console.log(response);
        if (response.error) {
          console.error(response.error);
        } else {
          console.log(response.result); // 输出：群组推荐结果
        }
      });
      
}

exports.getrecommend = getrecommend