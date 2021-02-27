const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
uuidv4();

var validateEmail = function (email) {
	var re = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
	return re.test(email);
};

const questionSchema = new mongoose.Schema({
	question: { type: String, required: [true, "Question is required"] },
	answer: { type: String, required: [true, "Answer is required"] },
});

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, "Name is required."],
			maxlength: 32,
		},

		email: {
			type: String,
			trim: true,
			unique: true,
			required: true,
			validate: [validateEmail, "Please fill a valid email address"],
			match: [
				/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
				"Please fill a valid email address",
			],
		},

		hashed_password: {
			type: String,
			required: true,
		},

		about: {
			type: String,
			trim: true,
		},

		salt: String,

		role: {
			type: Number,
			default: 0,
		},

		history: {
			type: Array,
			default: [],
		},

		questions: {
			q1: questionSchema,
			q2: questionSchema,
			q3: questionSchema,
		},
	},
	{ timestamps: true }
);

userSchema
	.virtual("password")
	.set(function (password) {
		this._password = password;
		this.salt = uuidv4();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

userSchema.methods = {
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) == this.hashed_password;
	},

	encryptPassword: function (password) {
		if (!password) return "";
		try {
			return crypto
				.createHmac("sha1", this.salt)
				.update(password)
				.digest("hex");
		} catch (err) {
			return "";
		}
	},
};

module.exports = mongoose.model("User", userSchema);
