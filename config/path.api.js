module.exports = {
    getApiHost      : path => 'http://' + ('localhost:8081/' + path).replace('//', '/'),
}