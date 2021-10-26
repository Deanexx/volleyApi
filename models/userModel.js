const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		trim: true,
		minLength: 2,
		unique: true
	}
})

const userModal = mongoose.model("User", userSchema);;
exports.userModal = userModal;
