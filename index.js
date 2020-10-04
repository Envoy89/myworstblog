const Application = require('./app');
require('./config/passport'); 

const configureDb = require('./db');

configureDb();

let app = new Application();

app.expressApp.listen(3000, function() {
    console.log('Listening on port 3000');
});

