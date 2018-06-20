// Cryptography
const crypto            = require('crypto');
const config            = require('../config/conf.server');
const md5               = str => crypto.createHash('md5').update(str).digest('base64');

function encryptPasswordMD5 (passMD5) {
    return md5(passMD5 + config.salt + passMD5);
}

module.exports = {
    md5,
    encryptPasswordMD5
}