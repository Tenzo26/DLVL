const Feedback = require("../models/feedback");
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.updateById = async (req, res) => {
	const { id } = req.params;
	const { status, content } = req.body;
	console.log(req.body);

	const feedback = await Feedback.update(
		{ _id: id },
		{ $set: { status: status, content: content } }
	);

	if (feedback) {
		return res.status(200).json({
			error: false,
			message: "success",
		});
	}

	return res.status(400).json({
		error: true,
		message: "something went wrong",
	});
};

exports.userUpdateById = async (req, res) => {
	const { id } = req.params;
	const { content } = req.body;

	const feedback = await Feedback.update(
		{ _id: id },
		{ $set: { content: content } }
	);

	if (feedback) {
		return res.status(200).json({
			error: false,
			message: "success",
		});
	}

	return res.status(400).json({
		error: true,
		message: "something went wrong",
	});
};

exports.getPublishedFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.find({})
			.where("status")
			.equals(true)
			.populate("user", "name");

		return res.status(200).json({
			result: feedback,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.pendingFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.find({}).populate("user", "name");
		return res.status(200).json({
			result: feedback,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.createFeedback = async (req, res) => {
	const content = req.body.content
	try {
		if (!content) {
			return res.status(400).json({
				error: "Content is empty"
			});
		}

		const feedback = new Feedback({
			content: content,
			user: req.profile
		});

		feedback.save((error, data) => {
			if (error) {
				return res.status(400).json({
					error: "Feedback Content is Empty.",
				});
			}
			res.json(data);
		});
	} catch (error) {
		console.log(error);
	}
};

exports.updateFeedback = async (req, res) => {
	const { id } = req.params;
	await Feedback.update({ _id: id }, { $set: { status: true } });
};

exports.deleteFeedback = async (req, res) => {
	const { id } = req.params;
	await Feedback.findOneAndDelete({ _id: id });
};
