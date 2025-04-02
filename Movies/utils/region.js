const IP2Region = require('ip2region').default;
const query = new IP2Region();
// 查询 IP 地址
exports.getGeolocation = (ip) => {
    const data = query.search(ip);
    console.log(data);
    return data;
}