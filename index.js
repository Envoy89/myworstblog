const Application = require('./app');

let app = new Application();

app.expressApp.listen(3000, function() {
    console.log('Listening on port 3000');
});

