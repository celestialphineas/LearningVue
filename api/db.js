const mongo         = require('mongodb');
const config        = require('../config/conf.server');
const kryptos       = require('./kryptos');
const mongoClient   = mongo.MongoClient;

function createUser(username, passMD5) {
    return {
        username,
        'md5'           : kryptos.encryptPasswordMD5(passMD5),
        validated       : false,
        course          : null,
        courseSeed      : 0,
        wordsDaily      : 20,
        wordsToLearn    : [],
        experience      : [],
        pinned          : []
    };
}

var defaultUser = createUser('test', kryptos.md5('test'));
defaultUser.validated = true;

mongoClient.connect(config.mongoURL, (err, db) => {
    if(err)  throw err;
    var memoriaDB = db.db('memoria');
    var userCollection = memoriaDB.collection('user');
    console.log('Database connected at ' + config.mongoURL);
    // Check whether the test user exists
    userCollection.find({'username':'test'}).toArray((err, res) => {
        if(!res.length) {
            userCollection.insertOne(defaultUser, (err, res) => {
                console.log(res);
                if(err) throw err;
                console.log('Test user inserted.');
                db.close();
            })
        } else {
            db.close();
        }
    });
});


module.exports = {

};
