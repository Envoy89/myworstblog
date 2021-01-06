const mongoose = require('mongoose');
const config = require('config');
const winston = require('./winston');

const url = process.env.DATABASE_URL || config.get('DataBase.url');

const configDataBase = () => {

    // todo add connection params
    mongoose.connect(url, { useNewUrlParser: true });

    const db = mongoose.connection

    db.once('open', _ => {
        winston.info(`Database connected: ${url}`);
    });

    db.on('error', err => {
        winston.error(`connection error: ${err}`);
    });
}

configDataBase();