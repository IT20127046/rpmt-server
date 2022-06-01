const mongoose = require("mongoose");

const supportMessage = new mongoose.Schema({
  userID: { type: String, required: true },
  userName: { type: String, required: true },
  panelMember: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  replay: { type: String },
  postDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SupportMessage", supportMessage);