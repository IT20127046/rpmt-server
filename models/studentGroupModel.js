const mongoose = require("mongoose");

const studentmodelSchema = new mongoose.Schema({
  groupid: {
    type: String,
    required: true,
  },

  groupname: {
    type: String,
    required: true,
  },

  studentid1: {
    type: String,
    required: true,
  },

  studentname1: {
    type: String,
    required: true,
  },

  studentid2: {
    type: String,
    required: true,
  },

  studentname2: {
    type: String,
    required: true,
  },

  studentid3: {
    type: String,
    required: true,
  },

  studentname3: {
    type: String,
    required: true,
  },

  studentid4: {
    type: String,
    required: true,
  },

  studentname4: {
    type: String,
    required: true,
  },

  supervisorname: {
    type: String,
    required: true,
  },

  cosupervisorname: {
    type: String,
    required: true,
  },

  panelmembername: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("studentgroupdetails", studentmodelSchema);
