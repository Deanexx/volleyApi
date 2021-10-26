const express = require("express");

const { getAllVotes, createVoteList, deleteUserFromList, addUserToList, setNet } = require("../controllers/votelist.js")
const router = express.Router();

router
	.get("/allVotes", getAllVotes)
	.post("/create", createVoteList)
	.post("/addUser", addUserToList)
	.delete("/deleteUser", deleteUserFromList)
	.patch("/setNet", setNet)
module.exports = router;
