const express = require("express");
const router = express.Router();
const MarkingSchem = require("../models/markingSchem");
const MarkingSchemTitle = require("../models/markingSchemaTitle");

// -- Marking Scheme Title --

// Save Marking Schem Title

router.post("/add/markingTitle", (req, res) => {
    let newMarkingTitle = new MarkingSchemTitle(req.body);
  
    newMarkingTitle.save((err, title) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Hotel Details Created Succefully",
        saveTitle: title.id
      });
    });
  });

// Get all Marking Scheme Title

router.get("/getAll/markingTitles", (req, res) => {
  MarkingSchemTitle.find().exec((err, markingTitles) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingMarkingTitles: markingTitles,
    });
  });
});

// Get Marking Scheme Title by ID

router.get("/markingTitle/get/:id", (req, res) => {
  let titleID = req.params.id;

  MarkingSchemTitle.findById(titleID, (err, schemeTitle) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      schemeTitle,
    });
  });
});

// Update Marking Scheme Title

router.put("/markingTitle/update/:id", (req, res) => {
  MarkingSchemTitle.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, document) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Update Successfully",
      });
    }
  );
});

// Delete Marking Scheme Title

router.delete("/markingTitle/delete/:id", (req, res) => {
  MarkingSchemTitle.findByIdAndRemove(req.params.id).exec(
    (err, deletedTitle) => {
      if (err)
        return res.status(400).json({
          message: "Deleted unsuccesful",
          err,
        });

      return res.json({
        message: "Deleted Succesfull",
        deletedTitle,
      });
    }
  );
});




// -- Marking Scheme Detail --

//save Marking Schem Details

router.post("/add/marking", (req, res) => {
  let newMarking = new MarkingSchem(req.body);

  newMarking.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Hotel Details Created Succefully",
    });
  });
});

//get Marking Schem Details

router.get("/get/markings", (req, res) => {
    MarkingSchem.find().exec((err, markingDetails) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingMarkingDetails: markingDetails,
      });
    });
  });

  //get Marking Schem Details by ID

  router.get("/markings/get/:id", (req, res) => {
    let titletID = req.params.id;
  
    MarkingSchem.find({markingSchemTitleID: titletID}, (err, markingCriteria) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        existingMarkingCriteria: markingCriteria,
      });
    });
  });

  //delete Marking Criteria Details

router.delete("/makingCriteria/delete/:id", (req, res) => {
    MarkingSchem
      .findByIdAndRemove(req.params.id)
      .exec((err, deletedCriteria) => {
        if (err)
          return res.status(400).json({
            message: "Deleted unsuccesful",
            err,
          });
  
        return res.json({
          message: "Deleted Succesfull",
          deletedCriteria,
        });
      });
  });
  
module.exports = router;