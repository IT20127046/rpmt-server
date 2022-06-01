const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    idNumber: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    groupId: {
        type: String
    },
    researchfield: {
        type: String
    },
    panel: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateRegistered: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('users', userSchema);