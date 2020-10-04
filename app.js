const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSessions = require('express-session');

const router = require('./routes');

class Application {
    constructor() {
        this.expressApp = express();

        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cookieParser());
        this.expressApp.use(expressSessions({secret: 'SECRET'}));

        nunjucks.configure('views', {
            autoescape: true, 
            express: this.expressApp
        });

        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
        this.expressApp.use(router);
    }
}


module.exports = Application;