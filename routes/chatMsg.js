const express = require("express");
const router = express.Router();
const SaveChatMsg = require("../models/chatMsg");
const Users = require("../models/users");

// Save user send messages
router.post("/save/chatMsg", (req, res) => {
  const sendMsg = new SaveChatMsg({
    room: req.body.room,
    author: req.body.author,
    message: req.body.message,
    time: req.body.time,
  });

  sendMsg
    .save()
    .then(() => res.json("success"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Get all messages
router.get("/chatMsg/all", (req, res) => {
  SaveChatMsg.find().exec((err, saveChatMsg) => {
    res.send(saveChatMsg);
  });
});

// Get message by group id
router.get("/chatMsg/get/:id", (req, res) => {
  let groupID = req.params.id;

  SaveChatMsg.find({room: groupID}, (err, groupMsgs) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.send(groupMsgs)
  });
});



// ----- User Model ----- //

// Get group members by group id
router.get("/groupMembers/get/:groupid", (req, res) => {
  let groupID = req.params.groupid;

  Users.find({groupId: groupID}).exec((err, groupMembers) => {
      if (err) {
          return res.status(400).json({
              error: err
          })
      }
      return res.send(groupMembers)
  })
});

module.exports = router;
