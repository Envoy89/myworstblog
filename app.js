const express = require('express');
const nunjucks = require('nunjucks');
const attachRoutes = require('./routes');

class Application {
    constructor() {
        this.expressApp = express();

        nunjucks.configure('views', {
            autoescape: true, 
            express: this.expressApp
        });

        attachRoutes(this.expressApp);
    }
}


module.exports = Application;