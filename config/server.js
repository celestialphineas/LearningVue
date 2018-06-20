const app       = require('../api/app');
const port      = 8081;
const server    = app.listen(port, () => {
    console.log('Server running at ' + port);
});

module.exports  = server;
