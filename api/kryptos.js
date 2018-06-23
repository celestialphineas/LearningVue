// Cryptography
const crypto            = require('crypto');
const config            = require('../config/conf.server');
const pathConfig        = require('../config/path.api');
const jwt               = require('jsonwebtoken');
const md5               = str => crypto.createHash('md5').update(str).digest('hex');

function encryptPasswordMD5(passMD5) {
    return md5(passMD5 + config.salt + passMD5);
}

function encryptAccessToken(email, passMD5) {
    return jwt.sign({
        name: email,
        pass: passMD5,
        iat: new Date().getTime()
    }, config.salt);
}

function decryptAccessToken(token) {
    try { return jwt.verify(token, config.salt); }
    catch(err) { return null; }
}

function getValidateHash(email) {
    return md5(email + config.salt);
}

function getValidateURL(email) {
    return pathConfig
        .getApiHost('/api/auth/' + email + '/validate/' + getValidateHash(email));
}

module.exports = {
    md5,
    encryptPasswordMD5,
    encryptAccessToken,
    decryptAccessToken,
    getValidateHash,
    getValidateURL
}