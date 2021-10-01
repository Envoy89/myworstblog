const winston = require('./config/winston');

const sendResponseWithError = (res, message) => {
    winston.error(message);

    return res.status(400).json({
        message
    });
}

module.exports = sendResponseWithError;