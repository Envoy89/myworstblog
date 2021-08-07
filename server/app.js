const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const config = require('config');
const expressSessions = require('express-session');
const morgan = require('morgan');
const winston = require('./config/winston');

const router = require('./routes');

class Application {
    constructor() {
        this.expressApp = express();

        this.expressApp.use(morgan('combined', { stream: winston.stream }));

        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(cookieParser());
        // todo get secret from secret store
        this.expressApp.use(expressSessions({secret: 'SECRET'}));

        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
        this.expressApp.use(router);
    }
}


module.exports = Application;