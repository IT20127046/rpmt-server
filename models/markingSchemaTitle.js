const mongoose = require("mongoose");

const markingSchemaTitle = new mongoose.Schema({
  moduleName: { type: String, required: true },
  assignment: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MarkingSchemTitle", markingSchemaTitle);