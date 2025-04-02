module.exports = (string) => {
    const crypto = require('crypto');
    const md5 = crypto.createHash('md5');
    return md5.update('wgrq' + string).digest('hex');
}