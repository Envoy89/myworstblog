const jwt = require('express-jwt');

// todo get secret from file
const auth = {
  required: jwt({
    secret: 'secret2',
    userProperty: 'payload',
    getToken: req => req.cookies.token,
    algorithms: ['sha1', 'RS256', 'HS256'],
  }),
  optional: jwt({
    secret: 'secret2',
    userProperty: 'payload',
    getToken: req => req.cookies.token,
    credentialsRequired: false,
    algorithms: ['sha1', 'RS256', 'HS256'],
  }),
};

module.exports = auth;