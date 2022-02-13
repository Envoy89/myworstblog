const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Tag = require('./Tag');

const topicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fullText: {
        type: String,
        required: true
    },
    tags: [Tag.schema]
});

module.exports = mongoose.model('Topic', topicSchema);