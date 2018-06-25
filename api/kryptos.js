// Cryptography
const crypto            = require('crypto');
const config            = require('../config/conf.server');
const salt              = require('../config/salt');
const jwt               = require('jsonwebtoken');
const md5               = str => crypto.createHash('md5').update(str).digest('hex');

function encryptPasswordMD5(passMD5) {
    return md5(passMD5 + salt + passMD5);
}

function encryptAccessToken(email, passMD5) {
    return jwt.sign({
        name: email,
        pass: passMD5,
        iat: new Date().getTime()
    }, salt);
}

function decryptAccessToken(token) {
    try { return jwt.verify(token, salt); }
    catch(err) { return null; }
}

function getValidateHash(email) {
    return md5(email + salt);
}

function getValidateURL(email) {
    return config
        .getApiHost('/api/auth/' + email + '/validate/' + getValidateHash(email));
}

function getResetHash(email) {
    return md5(salt + email + salt);
}

function getResetURL(email) {
    return config
        .getApiHost('/api/auth/' + email + '/resetpass/' + getResetHash(email));
}

module.exports = {
    md5,
    encryptPasswordMD5,
    encryptAccessToken,
    decryptAccessToken,
    getValidateHash,
    getValidateURL,
    getResetHash,
    getResetURL
}