const Faq = require("../models/faq");

exports.getFaq = async (req, res) => {
	try {
		const faq = await Faq.find();

		return res.status(200).json({
			result: faq,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.createFaq = async (req, res) => {
	const { title, content } = req.body;

	console.log(req.body);

	try {
		const faq = new Faq({
			title: title,
			content: content,
		});

		faq.save((error, data) => {
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

exports.updateFaq = async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	await Faq.update({ _id: id }, { $set: { title: title, content: content } });
};

exports.deleteFaq = async (req, res) => {
	const { id } = req.params;

	try {
		await Faq.findOneAndDelete({ _id: id });
		return res.status(200);
	} catch (error) {
		return res.status(400);
	}
};
