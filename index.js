const Application = require('./app');
const config = require('config');
const winston = require('./config/winston');
require('./config/passport'); 
require('./config/database');

const app = new Application();

const PORT = process.env.PORT || config.get('Server.port');

app.expressApp.listen(PORT, function() {
    winston.info(`Listening on port ${PORT}`)
});

