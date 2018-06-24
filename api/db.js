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
        courseEpoch     : 0,
        courseSeed      : 0,
        wordsDaily      : 20,
        wordsToLearn    : [],
        experience      : [],
        pinned          : [],
        courseLearnt    : []
    };
}

function getCollection(db) {
    return db.db('memoria').collection('user');
}

mongoClient.connect(config.mongoURL, (err, db) => {
    if(err) throw err;
    var defaultUser = createUserObj('test@example.com', kryptos.md5('test'));
    defaultUser.name = 'test';
    defaultUser.validated = true;
    var userCollection = getCollection(db);
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
    return new Promise((resolve, reject) => {
        mongoClient
            .connect(config.mongoURL)
            .then(db => {
                getCollection(db)
                    .updateOne({'email': email}, {$set: obj})
                    .then(() => { resolve(obj); db.close(); } )
                    .catch(err => { reject(err); db.close(); });
            })
            .catch(err => reject(err));
    });
}

function  insertNewUser(email, passMD5) {
    return new Promise((resolve, reject) => {
        var userObj = createUserObj(email, passMD5);
        mongoClient
            .connect(config.mongoURL)
            .then(db => {
                getCollection(db)
                    .findOne({'email': email})
                    .then(data => {
                        if(data) {
                            getCollection(db).updateOne({'email': email}, {$set: userObj})
                                .then(() => { resolve(userObj); db.close(); })
                                .catch(err => {console.log(err); db.close();});
                        } else {
                            getCollection(db).insertOne(userObj)
                                .then(() => { resolve(userObj); db.close(); })
                                .catch(err => {console.log(err); db.close();});
                        }
                    })
                    .catch(err => { reject(err); db.close(); });
            })
            .catch(err => reject(err));
    });
}

function userExists(email) {
    return new Promise((resolve, reject) => {
        mongoClient
            .connect(config.mongoURL)
            .then(db => {
                getCollection(db)
                    .findOne({'email': email})
                    .then(data => {
                        if(!data) resolve(false);
                        else resolve(true);
                        db.close();
                    })
                    .catch(err => { reject(err); db.close(); });
            })
            .catch(err => reject(err));
    });
}

function validateUser(email) {
    return new Promise((resolve, reject) => {
        mongoClient
            .connect(config.mongoURL)
            .then(db => {
                getCollection(db)
                    .updateOne({'email': email}, {$set: {'validated': 'true'}})
                    .then(() => { resolve(email); db.close(); })
                    .catch(err => { reject(err); db.close(); })
            })
            .catch(err => reject(err));
    });
}

function getUserdata(email) {
    return new Promise((resolve, reject) => {
        mongoClient
            .connect(config.mongoURL)
            .then(db => {
                var data = getCollection(db).findOne({'email': email});
                if(data) resolve(data);
                else reject(data);
                db.close();
            })
            .catch((err) => { throw err; });
    });
}

module.exports = {
    userExists,
    insertNewUser,
    updateUser,
    getUserdata,
    validateUser,
};
