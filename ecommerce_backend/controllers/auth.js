const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.forgot1 = (req, res) => {
	const { email, userId } = req.body;

	if (email) {
		User.findOne(email, (err, user) => {
			if (err || !user) {
				return res.status(200).json({
					error: true,
					message: "User with that email does not exist",
				});
			}

			return res.status(200).json({
				error: false,
				message: "success",
				userId: user._id,
				questions: user.questions,
			});
		});
	} else if (userId) {
		User.findById(userId, (err, user) => {
			if (err || !user) {
				return res.status(200).json({
					error: true,
					message: "User with that ID does not exist",
				});
			}

			return res.status(200).json({
				error: false,
				message: "success",
			});
		});
	}
};

exports.forgot2 = (req, res) => {
	const { userId, newPassword } = req.body;

	User.findById(userId, function (err, user) {
		if (err) return false;

		user.password = newPassword;
		user.save();

		return res.status(200).json({
			error: false,
			message: "Your password has been changed successfully",
		});
	});
};

exports.signupAdmin = (req, res) => {
	const credentials = ({ username, email, password } = req.body);
	const questions = ({ question_1, question_2, question_3 } = req.body);
	const answers = ({ answer_1, answer_2, answer_3 } = req.body);

	const user = new User({
		...credentials,
		role: 1,
		questions: {
			q1: { question: question_1, answer: answer_1 },
			q2: { question: question_2, answer: answer_2 },
			q3: { question: question_3, answer: answer_3 },
		},
	});

	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				error: err.message,
			});
		}

		user.salt = undefined;
		user.hashed_password = undefined;
		res.json({
			user,
		});
	});
};

exports.signup = (req, res) => {
	const credentials = ({ username, email, password } = req.body);
	const questions = ({ question_1, question_2, question_3 } = req.body);
	const answers = ({ answer_1, answer_2, answer_3 } = req.body);

	const user = new User({
		...credentials,
		questions: {
			q1: { question: question_1, answer: answer_1 },
			q2: { question: question_2, answer: answer_2 },
			q3: { question: question_3, answer: answer_3 },
		},
	});

	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				error: err.message,
			});
		}

		user.salt = undefined;
		user.hashed_password = undefined;
		res.json({
			user,
		});
	});
};

exports.signin = (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User with that email does not exist",
			});
		}

		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: "Email and password dont match",
			});
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			process.env.JWT_SECRET
		);

		res.cookie("t", token, { expire: new Date() + 9999 });
		const { _id, name, email, role } = user;
		return res.json({ token, user: { _id, email, name, role } });
	});
};

exports.signout = (req, res) => {
	res.clearCookie("t");
	res.json({ message: "Signout Success" });
};

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"],
	userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
	let user = req.profile && req.auth && req.profile._id == req.auth._id;

	if (!user) {
		return res.status(403).json({
			error: "Access Denied",
		});
	}

	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: "Admin Only. Access Denied",
		});
	}
	next();
};
