const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "Collection name is required."],
			maxlength: 32,
			unique: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Collection", CollectionSchema);