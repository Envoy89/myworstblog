const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const expressSessions = require('express-session');
const morgan = require('morgan');
const winston = require('./config/winston');
const cors = require('cors');
const config = require('config');

const router = require('./routes');

class Application {
    constructor() {
        this.expressApp = express();

        this.expressApp.use(morgan('combined', { stream: winston.stream }));

        this.expressApp.use(cors())
        this.expressApp.use(express.urlencoded({ extended: false }));
        this.expressApp.use(express.json());
        this.expressApp.use(cookieParser());
        this.expressApp.use(expressSessions({secret: config.get('Secrets.expressSessionSecret')}));

        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
        this.expressApp.use(router);

        this.expressApp.use(express.static(config.get('Folders.static')));
    }
}


module.exports = Application;