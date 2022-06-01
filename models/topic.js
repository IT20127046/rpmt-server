const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({

    groupId: {
        type: String,
        required: true,
    },
    topicR: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    comments: {
        type: String
    }
});

module.exports = mongoose.model('topics', topicSchema);