module.exports = {
    // This is the very important salt used for encryption
    // Modification of the string may result the database to invalid status
    auth            : true,
    serverPort      : 8642,
    mongoURL        : 'mongodb://localhost:27017/',
    mongoHost       : 'localhost',
    mongoPort       : 27017,
    getStaticPath   : path => ('/' + path).replace('//', '/'),
    getApiPath      : path => ('/api/' + path).replace('//', '/'),
    getApiHost      : path => 'http://' + ('39.108.226.122:8642/' + path).replace('//', '/'),
    getVueHost      : path => 'http://' + ('39.108.226.122:8642/' + path).replace('//', '/'),
    mailConfig      : {
        service: 'hotmail',
        auth: {
            user: 'memoria-no-reply@outlook.com',
            pass: 'MemoriaNoReply2018'
        }
    }
}
