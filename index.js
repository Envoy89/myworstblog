const Application = require('./app');
const config = require('config');
const winston = require('./config/winston');
require('./config/passport'); 
require('./config/database');

const app = new Application();

const PORT = config.get('Server.port');

app.expressApp.listen(PORT, function() {
    // todo get message from file
    winston.info(`Listening on port ${PORT}`)
});

