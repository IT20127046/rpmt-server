const express = require('express');
const mongoose = require('mongoose');
const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { type } = require('express/lib/response');


const router = express.Router();

process.env.SECRET_KEY = "secret2022";

//user registration with password encryption - user
router.post('/user/registration', (req, res) => {
  const current = new Date();
  let userData = {
    idNumber: req.body.idNumber,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    groupId: '',
    researchfield: '',
    panel: '',
    type: req.body.type,
    password: req.body.password,
    dateRegistered: current
  }

  Users.findOne({
    idNumber: req.body.idNumber
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          // console.log("bcrypt")
          Users.create(userData)
            .then(res => {
              // console.log("then")

              res.status(200).json({
                success: "Registered successfully"
              }).end()

            })
            .catch(err => {
              // console.log("catch")
              // res.status(400).send("error" + err).end();
              res.status(400).json({
                errorMessage: 'Something went wrong!',
                status: false
              });
              // console.log("error: " + err);
            });
        })

      }
      else {
        // res.status(400).json({
        //     error: "Your ID number is already registered"
        // }).end()
        return res.status(401).json({
          errorMessage: "Your ID number is already registered",
          status: false
        });
      }
    })
    .catch(err => {
      // res.send("error" + err)
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
      console.log("error: " + err)
    })
})

//user login with jsonwebtoken - user
router.post("/user/login", (req, res) => {
  Users.findOne({
    idNumber: req.body.idNumber,
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            idNumber: user.idNumber,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            groupId: user.groupId,
            researchfield: user.researchfield,
            panel: user.panel,
            type: user.type,
            dateRegistered: user.dateRegistered
          }
          const userToken = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(userToken)
        }
        else {
          // res.json({ error: "Please check your password and try again" })
          return res.status(401).json({
            errorMessage: 'User unauthorized!',
            status: false
          });
        }
      }
      else {
        // res.json({ error: "ID number is not registered in the system" })
        return res.status(401).json({
          errorMessage: "Your ID number cannot be recognized",
          status: false
        });
      }
    })
    .catch(err => {
      // res.send("error" + err);
      res.status(400).json({
        errorMessage: 'Something went wrong!',
        status: false
      });
      console.log("error: " + err);
    })
});

//get a specific user
router.get("/user/:id", (req, res) => {
  let userId = req.params.id;

  Users.findById(userId, (err, user) => {
    if (err) {
      return res.status(404).json({
        success: false,
        err,
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  });
});

//get users - admin
router.get("/users", (req, res) => {
  Users.find().exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingUsers: users,
    });
  });
});

//get users by type - admin
router.get('/users/:type', (req, res) => {
  let usertype = req.params.type;
  Users.find({ type: usertype }).exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: err
      })
    }
    return res.status(200).json({
      success: true,
      existingUsers: users
    })
  })
});

//update user - admin
router.put("/user/update/:id", (req, res) => {
  Users.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, user) => {
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

//update user - user
router.put("/user/updateprofile/:id", (req, res) => {
  Users.findOne({
    idNumber: req.body.idNumber,
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.enteredPassword, user.password)) {

          bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
            const newData = {
              idNumber: req.body.idNumber,
              name: req.body.name,
              email: req.body.email,
              mobile: req.body.mobile,
              groupId: req.body.groupId,
              researchfield: req.body.researchfield,
              panel: req.body.panel,
              type: req.body.type,
              dateRegistered: req.body.dateRegistered,
              password: hash
            }

            Users.findByIdAndUpdate(
              req.params.id,
              {
                $set: newData,
              },
              (err, user) => {
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
          })
        } else {
          return res.status(401).json({
            errorMessage: 'Password not matched!',
            status: false
          });
        }
      }
      else {
        return res.status(401).json({
          errorMessage: "Cannot find the user",
          status: false
        });
      }
    
    })
  .catch(err => {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
    console.log("error: " + err);
  })
});

//delete user
router.delete("/user/delete/:id", (req, res) => {
  Users.findByIdAndDelete(req.params.id).exec((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.json({
      message: "Deleted succesfully",
      deletedUser,
    });
  });
});

module.exports = router;
