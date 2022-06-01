const express = require("express");
const Admin = require("../models/admin");   // model
const bcrypt = require("bcryptjs");         // for password hashing
const jwt = require("jsonwebtoken");        // for creating user tokens

const router = express.Router();

// admin login
router.post("/admin", async (req, res) => {

  // find the admin by username
  const admin = await Admin.findOne({ 	
    username: req.body.username,
  });

  // for non-existing username
  if (!admin) {
    return { status: "error", error: "Invalid login" };
  }

  // for an existing username
  // compare the entered password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    admin.password
  );

  // for a valid password
  // create a user token using json web tokens
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        username: admin.username,
      },
      "secret2022"
    );

    return res.json({ status: "ok", admin: token });
  } else {
    return res.json({ status: "error", admin: false });
  }
});

// router.post('/admin', async (req, res) => {
// 	// console.log(req.body)
// 	try {
// 		const newPassword = await bcrypt.hash(req.body.password, 10)
// 		await Admin.create({
// 			username: req.body.username,
// 			password: newPassword
// 		})
// 		res.json({ status: 'ok', success: "Registered succcessfully"})
// 	} catch (err) {
// 		res.json({ status: 'error', error: err })
// 	}
// })

module.exports = router;
