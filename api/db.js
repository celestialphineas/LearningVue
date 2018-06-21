const mongo         = require('mongodb');
const config        = require('../config/conf.server');
const kryptos       = require('./kryptos');
const mongoClient   = mongo.MongoClient;

function createUserObj(email, passMD5) {
    return {
        email,
        name            : '',
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

mongoClient.connect(config.mongoURL, (err, db) => {
    if(err) throw err;
    var defaultUser = createUserObj('test', kryptos.md5('test'));
    defaultUser.name = 'test';
    defaultUser.validated = true;
    var memoriaDB = db.db('memoria');
    var userCollection = memoriaDB.collection('user');
    console.log('Database connected at ' + config.mongoURL);
    // Check whether the test user exists
    userCollection.find({'email':'test@example.com'}).toArray((err, res) => {
        if(!res.length) {
            userCollection.insertOne(defaultUser, (err, res) => {
                if(err) throw err;
                else console.log('Test user inserted.');
                db.close();
            })
        } else {
            db.close();
        }
    });
});

// Example call: updateUser('test@example.com', {'name': 'NewTest'});
function updateUser(email, obj) {
    mongoClient.connect(config.mongoURL, (err, db) => {
        if(err) throw err;
        var memoriaDB = db.db('memoria');
        var userCollection = memoriaDB.collection('user');
        userCollection.updateOne({'email': email}, {$set: obj}, (err, res) => {
            if(err) throw err;
            else console.log('User ' + email + ' updated ' + obj);
            db.close();
        });
    });
}

function insertNewUser(email, passMD5) {
    mongoClient.connect(config.mongoURL, (err, db) => {
        if(err) throw err;
        var memoriaDB = db.db('memoria');
        var userCollection = memoriaDB.collection('user');
        userCollection.insertOne(createUserObj(email, passMD5), (err, res) => {
            if(err) throw err;
            else console.log('New user inserted: ' + email);
            db.close();
        })
    });
}

function queryUserExistence(email, iftCallback, iffCallback) {
    mongoClient.connect(config.mongoURL, (err, db) => {
        if(err) throw err;
        var memoriaDB = db.db('memoria');
        var userCollection = memoriaDB.collection('user');
        userCollection.find({'email': email}).toArray((err, res) => {
            if(err) throw err;
            db.close()
            if(res.length) iftCallback();
            else iffCallback();
        });
    });
}

function validateUser(email) {
    mongoClient.connect(config.mongoURL, (err, db) => {
        if(err) throw err;
        var memoriaDB = db.db('memoria');
        var userCollection = memoriaDB.collection('user');
        userCollection.updateOne({'email': email}, {$set: {'validated': 'true'}}, (err, res) => {
            if(err) throw err;
            else console.log('User ' + email + ' updated ' + obj);
            db.close();
        });
    })
}

function getUserdata(email, callback) {
    mongoClient.connect(config.mongoURL, (err, db) => {
        if(err) throw err;
        var memoriaDB = db.db('memoria');
        var userCollection = memoriaDB.collection('user');
        userCollection.find({'email': email}).toArray((err, res) => {
            callback(err, res);
        });
    });
}

module.exports = {
    updateUser,
    getUserdata,
    insertNewUser,
    validateUser,
    queryUserExistence,
};
