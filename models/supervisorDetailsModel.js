const mongoose = require("mongoose");

const supervisormodelSchema = new mongoose.Schema({
  supervisorid: {
    type: String,
    required: true,
  },

  supervisorname: {
    type: String,
    required: true,
  },

  researchfield: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("supervisordetails", supervisormodelSchema);
