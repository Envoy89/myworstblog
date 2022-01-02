const mongoose = require('mongoose');
const Schema = mongoose.Schema

const topicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fullText: {
        type: String,
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});

module.exports = mongoose.model('Topic', topicSchema);