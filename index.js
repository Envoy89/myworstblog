const Application = require('./app');
const config = require('config');
require('./config/passport'); 
require('./config/database');

let app = new Application();

const PORT = config.get('Server.port');

app.expressApp.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});

