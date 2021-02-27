const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Faq", faqSchema);
