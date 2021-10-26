const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, "Full date name" ],
		unique: true,
		enum: {
			values: [ "Monday", "Tuesday", "Wednesday", 
				"Thursday", "Friday", "Saturday", "Sunday" ],
			message: 
				"Invalid name of a day, got {VALUE} should be full started with capital"
		}
	},
	voted: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "User",
			default: []
		}
	],
	active: {
		type: Boolean,
		default: true
	},
	net: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		default: null
	}
},
{	
	toJSON: { virtuals: true },
	toObject: { virtuals: true }
});

voteSchema.virtual("hmUsers").get(function() {
	return this.voted.length;
})

module.exports = mongoose.model("Vote", voteSchema);
