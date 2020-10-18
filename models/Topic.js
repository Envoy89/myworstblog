const mongoose = require('mongoose');
const Schema = mongoose.Schema

const topicSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    fullText: {
        type: String,
        require: true
    }, 
});

module.exports = mongoose.model('Topic', topicSchema);