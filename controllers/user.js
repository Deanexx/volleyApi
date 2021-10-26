const { userModal } = require("./../models/userModel.js");
const voteListModel  = require("./../models/voteModel.js");

const appError = require("./../util/appError");
const asyncCatch = require("./../util/catchAsync");

exports.createUser = asyncCatch(async (req, res) => {
	const newUser = await userModal.create({ name : req.body.name });
	
	return res
		.status(201)
		.cookie("user", newUser._id, { maxAge : 3000 * 24 * 60 * 60 * 1000 })
		.json({
			status: "success",
			data: newUser
		})
})



exports.loginUser = asyncCatch(async (req, res, next) => {
	const user = await userModal.findOne({ name: req.body.name })
	
	if(!user)
		return next(new appError("No user Found in DB", 401))
	
	return res
		.status(200)
		.cookie("user", user._id, { maxAge: 3000 * 24 * 60 * 60 * 1000 })
		.json({ status: "success", data: user });
	
})

exports.logoutUser = async (req, res) => {
	return res
		.status(200)
		.cookie("user", "", { maxAge: -1 })
		.json({ status: "success" })
}

exports.changeName = asyncCatch(async (req, res) => {
	const userId = req.cookies.user;
	const user = await userModal.findById(userId);
	
	if(!user)
		return next(new appError("No user, clear cookies !!!", 400))
	
	user.name = req.body.name;
	user.save();
	
	
	res
		.status(200)
		.json({ 
			status: "success"
		})
})
