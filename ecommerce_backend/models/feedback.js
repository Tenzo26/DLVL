const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const feedbackSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true
		},
		status: {
			type: Boolean,
			default: false,
		},
		user: { type: ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
