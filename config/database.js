const mongoose = require('mongoose');
const config = require('config');
const winston = require('./winston');

// todo add user auth
// todo get url from config or start parametrs
const url = config.get('DataBase.url');

const configDataBase = () => {

    // todo add connection params
    mongoose.connect(url, { useNewUrlParser: true });

    const db = mongoose.connection

    db.once('open', _ => {
        winston.info(`Database connected: ${url}`);
    });

    db.on('error', err => {
        winston.info(`connection error: ${err}`);
    });
}

configDataBase();