const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Schema({
    name: String, 
    text: String
});

module.exports = mongoose.model('Post', postSchema);