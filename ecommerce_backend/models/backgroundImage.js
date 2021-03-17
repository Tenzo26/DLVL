const mongoose = require("mongoose");

const backgroundImageSchema = new mongoose.Schema(
	{
		photo: {
			data: Buffer,
			contentType: String,
		},

		isSet: Boolean,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("BackgroundImage", backgroundImageSchema);
