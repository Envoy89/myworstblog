const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

const userSchema = new Schema({
    login: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    // todo get secret from file
    return jwt.sign({
      login: this.login,
      id: this._id,
      exp: parseInt(expirationDate.getTime(), 10),
    }, 'secret2');
  }

userSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    login: this.login,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('User', userSchema);