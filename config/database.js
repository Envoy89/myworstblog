const mongoose = require('mongoose');
const config = require('config');

// todo add user auth
// todo get url from config or start parametrs
const url = config.get('DataBase.url');

const configDataBase = () => {

    // todo add connection params
    mongoose.connect(url, { useNewUrlParser: true });

    const db = mongoose.connection

    db.once('open', _ => {
        // todo remove console log, add log, get message from file
        console.log('Database connected:', url);
    });

    db.on('error', err => {
        // todo remove console log, add log, get message from file
        console.error('connection error:', err);
    });
}

configDataBase();