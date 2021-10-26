const voteListModel = require("./../models/voteModel.js");
const appError = require("./../util/appError")
const catchAsync = require("./../util/catchAsync")

exports.getAllVotes = catchAsync(async (_, res, next) => {
	const allVotes = await voteListModel.find().populate("voted net");
	
	res
		.status(200)
		.json({
			status: "success",
			data: allVotes
		})
})

exports.createVoteList = catchAsync(async ({ body }, res, next) => {
	const { days } = body;
	
	if(!Array.isArray(days))
		return next(new appError("Send params only ARRAY!", 400))
	
	const  result = await voteListModel.insertMany(days.map( el => { 
		return { name: el } 
	} ))
	
	return res
		.status(200)
		.json({
			status: "success",
			data: result
			});
})

exports.addUserToList = async (req, res) => {
	const [ voteId, userId ] = [ req.body.voteId, req.cookies.user ];

	let voteList = await voteListModel.findById({ _id: voteId });
	voteList.voted.push(userId);
	voteList.save();
	return res
		.status(200)
		.json({ 
			status: "success",
			data: voteList
	})
}

exports.deleteUserFromList = async (req, res) => {
	const [ voteId, userId ] = [ req.body.voteId, req.cookies.user ];

	let voteList = await voteListModel.findById(voteId);
	voteList.voted.splice( voteList.voted.indexOf( userId ), 1);
	voteList.save();
	return res
		.status(200)
		.json({ 
			status: "success",
			data: voteList
	})
}

exports.setNet = async (req, res) => {
	const [ voteId, userId ] = [ req.body.voteId, req.cookies.user ];
	let voteList = await voteListModel.findById(voteId);
	voteList.net === null ? voteList.net = userId : voteList.net = null;
	voteList.save();
	return res
		.status(200)
		.json({
			status: "success",
			data: voteList
		})
}
