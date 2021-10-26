const express = require("express");
const { createUser, loginUser, logoutUser, changeName } = require("./../controllers/user.js");

const router = express.Router();

router
	.route("/create")
	.post(createUser)

router
	.route("/login")
	.post(loginUser)

router
	.route("/logout")
	.get(logoutUser)

router
	.route("/changeName")
	.put(changeName)

module.exports = router;
