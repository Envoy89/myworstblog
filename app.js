const express = require('express');
const attachRoutes = require('./routes');

class Application {
    constructor() {
        this.expressApp = express();
        attachRoutes(this.expressApp);
    }
}


module.exports = Application;