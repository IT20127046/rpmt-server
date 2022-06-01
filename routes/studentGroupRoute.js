const express = require("express");
const res = require("express/lib/response");
const studentgroups = require("../models/studentGroupModel");
const router = express.Router();

//save student group details

router.post("/sgroup/save", (req, res) => {
  let newGroup = new studentgroups(req.body);

  newGroup.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Group Created Succefully",
    });
  });
});

//get student group details

router.get("/sgroups", (req, res) => {
  studentgroups.find().exec((err, stugroups) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingstudentgroups: stugroups,
    });
  });
});

//get specific student group detail

router.get("/sgroup/:id", (req, res) => {
  let sgroupId = req.params.id;

  studentgroups.findById(sgroupId, (err, stugroup) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      stugroup,
    });
  });
});

//get specific student group detail using group id

router.get("/stugroup/:id",(req,res) =>{
  let gId = req.params.id;

  studentgroups.findOne({groupid:gId},(err,stugroup)=>{
      if(err){
          return res.status(400).json({success:false, err});
      }
      return res.status(200).json({
          success:true,
         stugroup,
      });
  });
});


//update student group details

router.put("/sgroup/update/:id", (req, res) => {
  studentgroups.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, stugroup) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Update Successfully",
      });
    }
  );
});

//delete student group details

router.delete("/sgroup/delete/:id", (req, res) => {
  studentgroups.findByIdAndRemove(req.params.id).exec((err, deletedGroup) => {
    if (err)
      return res.status(400).json({
        message: "Deleted unsuccesful",
        err,
      });

    return res.json({
      message: "Deleted Succesfull",
      deletedGroup,
    });
  });
});

module.exports = router;
