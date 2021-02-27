const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "Category name is required."],
			maxlength: 32,
			unique: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
