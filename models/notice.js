const mongoose = require("mongoose");

const notice = new mongoose.Schema({
    noticeTitle: { type: String, required: true },
    noticeMessage: { type: String, required: true },
    to: { type: String, required: true },
    postDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notice", notice);