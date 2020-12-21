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
        // todo get secret from secret store
        this.expressApp.use(expressSessions({secret: 'SECRET'}));

        // todo get nunjucks folder from config
        nunjucks.configure('views', {
            autoescape: true, 
            express: this.expressApp
        });

        this.expressApp.use(passport.initialize());
        this.expressApp.use(passport.session());
        this.expressApp.use(router);

        // todo get static folder from config
        this.expressApp.use(express.static('public'));
    }
}


module.exports = Application;