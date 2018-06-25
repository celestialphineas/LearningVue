const config    = require('./conf.server');
const app       = require('../api/app');
const port      = config.serverPort;
const server    = app.listen(port, () => {
    console.log('Server running at ' + port);
});

module.exports  = server;
