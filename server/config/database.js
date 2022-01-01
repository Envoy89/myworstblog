const mongoose = require('mongoose');
const config = require('config');
const winston = require('./winston');

const url = process.env.DATABASE_URL || config.get('DataBase.url');

const configDataBase = () => {

    // todo add connection params
    mongoose.connect(url, { useNewUrlParser: true });

    mongoose.set("debug", (collectionName, method, query, doc) => {
        winston.info(`${collectionName}.${method} query: ${JSON.stringify(query)} doc: ${JSON.stringify(doc)}`);
    });

    const db = mongoose.connection

    db.once('open', _ => {
        winston.info(`Database connected: ${url}`);
    });

    db.on('error', err => {
        winston.error(`connection error: ${err}`);
    });
}

configDataBase();