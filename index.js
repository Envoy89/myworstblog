const Application = require('./app');
const config = require('config');
require('./config/passport'); 
require('./config/database');

const app = new Application();

const PORT = config.get('Server.port');

app.expressApp.listen(PORT, function() {
    // todo remove console.log, add loger, get message from file
    console.log(`Listening on port ${PORT}`);
});

