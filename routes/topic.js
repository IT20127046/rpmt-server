const express = require("express");
const Topics = require("../models/topic");

const router = express.Router();

// save Topic to get the confirmation or rejection
router.post("/topic/save", (req, res) => {
  let newTopic = new Topics(req.body);
  newTopic.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Topic saved succcessfully",
    });
  });
});

// get saved topics
router.get("/topics", (req, res) => {
  Topics.find().exec((err, topics) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingTopics: topics,
    });
  });
});

// get the specific topic details
router.get("/topic/:id", (req, res) => {
  let topicId = req.params.id;

  Topics.findById(topicId, (err, topic) => {
    if (err) {
      return res.status(404).json({
        success: false,
        err,
      });
    }

    return res.status(200).json({
      success: true,
      topic,
    });
  });
});

// get topics acccording to the Group ID
router.get("/topic/submissions/:id", (req, res) => {
  let id = req.params.id;

  Topics.find({ groupId: id }).exec((err, topics) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingTopics: topics,
    });
  });
});

// update topic
router.put("/topic/update/:id", (req, res) => {
  Topics.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, topic) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Updated successfully",
      });
    }
  );
});

//delete topic
router.delete("/topic/delete/:id", (req, res) => {
  Topics.findByIdAndDelete(req.params.id).exec((err, deletedTopic) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.json({
      message: "Deleted succesfully",
      deletedTopic,
    });
  });
});

module.exports = router;
