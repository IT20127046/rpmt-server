const express = require("express");
const res = require("express/lib/response");
const supervisorrequests = require("../models/requestModel");
const router = express.Router();

//save Supervisor Requests

router.post("/request/save", (req, res) => {
  let newRequest = new supervisorrequests(req.body);

  newRequest.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Feedback Send Succefully",
    });
  });
});


//get Supervisor Requests

router.get("/requests", (req, res) => {
    supervisorrequests.find().exec((err, supervisorrequest) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingsupervisorrequests: supervisorrequest,
    });
  });
});

//get specific Supervisor Request

router.get("/request/:id", (req, res) => {
  let requestId = req.params.id;

  supervisorrequests.findById(requestId, (err, supervisorrequest) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      supervisorrequest,
    });
  });
});

//get specific supervisor request using group id

router.get("/request/summary/:id",(req,res) =>{
  let gId = req.params.id;

  supervisorrequests.find({groupid:gId},(err,supervisorrequest)=>{
      if(err){
          return res.status(400).json({success:false, err});
      }
      return res.status(200).json({
          success:true,
          supervisorrequest,
      });
  });
});



module.exports = router;
