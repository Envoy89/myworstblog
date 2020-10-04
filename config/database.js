const mongoose = require('mongoose');
const config = require('config');

const url = config.get('DataBase.url');

const configDataBase = () => {

    mongoose.connect(url, { useNewUrlParser: true });

    const db = mongoose.connection

    db.once('open', _ => {
        console.log('Database connected:', url);
    });

    db.on('error', err => {
        console.error('connection error:', err);
    });
}

configDataBase();