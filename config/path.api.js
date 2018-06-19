module.exports = {
    getStaticPath   : path => ('/' + path).replace('//', '/'),
    getApiPath      : path => ('/api/' + path).replace('//', '/'),
    getApiHost      : path => 'http://' + ('localhost:8081/' + path).replace('//', '/'),
}