const express = require("express");
const res = require("express/lib/response");
const supervisordetails = require("../models/supervisorDetailsModel");
const router = express.Router();

//save Supervisor Details

router.post("/supervisor/save", (req, res) => {
  let newSupervisor = new supervisordetails(req.body);

  newSupervisor.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Supervisor Details Created Succefully",
    });
  });
});


//get Supervisor Details

router.get("/supervisors", (req, res) => {
  supervisordetails.find().exec((err, sdetails) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingsupervisordetails: sdetails,
    });
  });
});

//get specific Supervisor Details

router.get("/supervisor/:id", (req, res) => {
  let supervisorsId = req.params.id;

  supervisordetails.findById(supervisorsId, (err, sdetail) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      sdetail,
    });
  });
});

//update Supervisor Details

router.put("/supervisor/update/:id", (req, res) => {
  supervisordetails.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, sdetail) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Update Successfully",
      });
    }
  );
});

//delete Supervisor Details

router.delete("/supervisor/delete/:id", (req, res) => {
  supervisordetails
    .findByIdAndRemove(req.params.id)
    .exec((err, deletedSupervisor) => {
      if (err)
        return res.status(400).json({
          message: "Deleted unsuccesful",
          err,
        });

      return res.json({
        message: "Deleted Succesfull",
        deletedSupervisor,
      });
    });
});

module.exports = router;
