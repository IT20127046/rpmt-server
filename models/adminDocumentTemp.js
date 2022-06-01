const mongoose = require("mongoose");

const documentTemplate = new mongoose.Schema({
  documentType: { type: String, required: true },
  otherType: { type: String, required: true },
  description: { type: String, required: true },
  files: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DocumentTemplate", documentTemplate);