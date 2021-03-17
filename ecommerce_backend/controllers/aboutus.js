const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");
const AboutUs = require("../models/aboutus");

//not sure kung tama to haha
//exports.updateAboutUs = async (req, res) => {
//	const { userId, content, description } = req.body;

//	try {
//		const AboutUs = new AboutUs({
//			user: userId,
//			content: content,
//			description: description,
//		});

//		AboutUs.save((error, data) => {
//			if (error) {
//				return res.status(400).json({
//				error: errorHandler(error),
//				});
//			}
//			res.json(data);
//		});
//	} catch (error) {
//		console.log(error);
//	}
//};

exports.updateAboutUs = async (req, res) => {
	console.log(JSON.stringify(req.body));
	const description = req.body.description;
	if (description == "") {
		return res.status(400).json({
			error: true
		});
	}

	const desc = await AboutUs.update(
		{ _id: "6051a93d6ed9217df83ea8d1" },
		{ $set: { description: description } }
	);

	return res.status(200).json({
		error: false
	});

	/*
	try {
		const AboutUs = new Desc({
			user: userId,
			description: description,
		});

		Desc.save((error, result) => {
			if (error) {
				return res.status(400).json({
					error: errorHandler(error),
				});
			}
			res.json(result);
		});
	} catch (error) {
		console.log(error);
	}*/
};

// get desc
exports.getDesc = (req, res) => {
	AboutUs.find()
	.exec((error, description) => {
		if (error) {
			return res.status(400).json({
				error: errorHandler(error)
			})
		}
		res.json(description);
	});
}

//removed feature
exports.removeAboutUs= (req, res) => {
	AboutUs.deleteMany({}, (err, result) => {
		if (!err) {
			return res.status(200).json({
				error: false,
				message: "Description removed.",
			});
		}
	});
};