module.exports = {
    // This is the very important salt used for encryption
    // Modification of the string may result the database to invalid status
    auth            : true,
    salt            : 'Memor1a-2018CELphi@Zju', 
    mongoURL        : 'mongodb://localhost:27017/',
    mongoHost       : 'localhost',
    mongoPort       : 27017,
    getStaticPath   : path => ('/' + path).replace('//', '/'),
    getApiPath      : path => ('/api/' + path).replace('//', '/')
}
