const express = require("express");
const res = require("express/lib/response");
const Evaluations = require("../models/evaluation");
const router = express.Router();

//save evaluations

router.post("/evaluation/save", (req, res) => {
  let newEvaluation = new Evaluations(req.body);

  newEvaluation.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Evaluation saved Successfully",
    });
  });
});

//get all evaluations
//get all

router.get("/evaluations", (req, res) => {
  Evaluations.find().exec((err, evaluations) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingEvaluations: evaluations,
    });
  });
});

//get a specipic evaluation
router.get("/evaluation/:id", (req, res) => {
  let evaluationId = req.params.id;

  Evaluations.findById(evaluationId, (err, evaluation) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      evaluation,
    });
  });
});

//update evaluation
router.put("/evaluation/update/:id", (req, res) => {
  Evaluations.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, evaluation) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Update Successfully",
      });
    }
  );
});

//delete evaluation

router.delete("/evaluation/delete/:id", (req, res) => {
  Evaluations.findByIdAndRemove(req.params.id).exec(
    (err, deletedEvaluation) => {
      if (err)
        return res.status(400).json({
          message: "Deleted unsuccesful",
          err,
        });

      return res.json({
        message: "Deleted Succesfull",
        deletedEvaluation,
      });
    }
  );
});







//get a specipic grp id evaluation
router.get("/evaluation/group/:id",(req,res) =>{
  let gId = req.params.id;

  Evaluations.find({groupId:gId},(err,evaluation)=>{
      if(err){
          return res.status(400).json({success:false, err});
      }
      return res.status(200).json({
          success:true,
          existingEvaluations:evaluation
      });
  });
});







//get a specipic panel evaluation
router.get("/evaluation/panel/:id",(req,res) =>{
  let pnl = req.params.id;

  Evaluations.find({panel:pnl},(err,evaluation)=>{
      if(err){
          return res.status(400).json({success:false, err});
      }
      return res.status(200).json({
          success:true,
          existingEvaluations:evaluation
      });
  });
});







module.exports = router;
