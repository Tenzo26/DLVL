const Feedback = require("../models/feedback");

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
	const { userId, content } = req.body;

	try {
		const feedback = new Feedback({
			user: userId,
			content: content,
		});

		feedback.save((error, data) => {
			if (error) {
				return res.status(400).json({
					error: errorHandler(error),
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
