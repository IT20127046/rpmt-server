const express = require("express");
const res = require("express/lib/response");
const submitionTypes = require("../models/submitionType");
const router = express.Router();

//save submition type

router.post("/submitiontype/save", (req, res) => {
  let newsubmitionType = new submitionTypes(req.body);

  newsubmitionType.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Data saved Succefully",
    });
  });
});

//get submition types

router.get("/submitiontypes", (req, res) => {
  submitionTypes.find().exec((err, submitiomtypes) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingsubmitonTypes: submitiomtypes,
    });
  });
});

//get a specipic submition
router.get("/submitiontype/:id", (req, res) => {
  let submitiontypeId = req.params.id;

  submitionTypes.findById(submitiontypeId, (err, submitiontype) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      submitiontype,
    });
  });
});

//update submition type
router.put("/submitiontype/update/:id", (req, res) => {
  submitionTypes.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, submitiontype) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Update Successfully",
      });
    }
  );
});

//delete submitiontype

router.delete("/submitiontype/delete/:id", (req, res) => {
  submitionTypes
    .findByIdAndRemove(req.params.id)
    .exec((err, deletedsubmitionType) => {
      if (err)
        return res.status(400).json({
          message: "Deleted unsuccesful",
          err,
        });

      return res.json({
        message: "Deleted Succesfull",
        deletedsubmitionType,
      });
    });
});

module.exports = router;
