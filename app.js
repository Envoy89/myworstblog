const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const router = require('./routes');

class Application {
    constructor() {
        this.expressApp = express();

        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(bodyParser.json());

        nunjucks.configure('views', {
            autoescape: true, 
            express: this.expressApp
        });

        this.expressApp.use(router);
    }
}


module.exports = Application;