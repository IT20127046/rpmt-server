const express = require("express");
const router = express.Router();
const SupportMsg = require('../models/supportMsg');

// Save message
router.post('/supprtMsg/add',(req,res)=>{
  let newSupportMsg = new SupportMsg(req.body);

  newSupportMsg.save((err)=>{
      if(err){
          return res.status(400).json({
              error:err
          });
      }
      return res.status(200).json({
          success: true
      });
  });
});

// Get all messages
router.get("/supprtMsg/getAll", (req, res) => {
    SupportMsg.find().exec((err, msgs) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingMessages: msgs,
      });
    });
  });

// Get message by ID
router.get("/supprtMsg/get/:id", (req, res) => {
    let msgID = req.params.id;
  
    SupportMsg.findById(msgID, (err, message) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        message,
      });
    });
  });

// Update message
router.put("/supprtMsg/update/:id", (req, res) => {
    SupportMsg.findByIdAndUpdate(
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

  // Delete message
  router.delete("/supprtMsg/delete/:id", (req, res) => {
    SupportMsg.findByIdAndRemove(req.params.id).exec(
      (err, deletedMsg) => {
        if (err)
          return res.status(400).json({
            message: "Deleted unsuccesful",
            err,
          });
  
        return res.json({
          message: "Deleted Succesfull",
          deletedMsg,
        });
      }
    );
  });

  module.exports = router;