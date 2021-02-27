const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const BackgroundImage = require("../models/backgroundImage");

exports.getBg = (req, res, next) => {
	BackgroundImage.findOne({ isSet: true }, (err, result) => {
		if (result) {
			res.set("Content-Type", result.photo.contentType);
			res.send(result.photo.data);
		}

		next();
	});
};

exports.changeBg = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({
				error: "Image could not be uploaded",
			});
		}

		BackgroundImage.deleteMany({ isSet: true }, (err, result) => {
			if (!err) {
				const newBackground = new BackgroundImage({ isSet: true });

				if (files.photo) {
					if (files.photo.size > 5000000) {
						return res.status(400).json({
							error: "Image should be less than 5MB in size",
						});
					}

					newBackground.photo.data = fs.readFileSync(
						files.photo.path
					);
					newBackground.photo.contentType = files.photo.type;
				}

				newBackground.save((err, result) => {
					if (err) {
						return res.status(400).json({
							error: errorHandler(err),
						});
					}

					return res.status(200).json({
						error: false,
						message:
							"Background image has been updated successfuly!",
					});
				});
			}
		});
	});
};

exports.removeBg = (req, res) => {
	BackgroundImage.deleteMany({}, (err, result) => {
		if (!err) {
			return res.status(200).json({
				error: false,
				message: "Background removed.",
			});
		}
	});
};
