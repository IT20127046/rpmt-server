const mongoose = require("mongoose");

const markingSchema = new mongoose.Schema({
  markingSchemTitleID: { type: String, required: true },
  criteria: { type: String, required: true },
  allocateMark: { type: String, required: true },
  postDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MarkingSchem", markingSchema);