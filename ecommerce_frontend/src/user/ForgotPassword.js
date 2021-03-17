import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { forgot1, forgot2 } from "../auth";

const Reset = () => {
	const [values, setValues] = useState({
		step: 1,
		email: "",
		password: "",
		confirm_password: "",
		user: null, // store user id here (reseit using email),
		userId: null,
		questions: {},
		answer_1: "",
		answer_2: "",
		answer_3: "",
		error: false,
		message: "",
		success: false,
	});

	const {
		email,
		password,
		confirm_password,
		error,
		success,
		questions,
		message,
		user,
		userId,
		answer_1,
		answer_2,
		answer_3,
	} = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const Step1Form = () => (
		<form onSubmit={step1Submit}>
			<div className="form-group">
				<label className="text-muted">Email</label>
				<input
					onChange={handleChange("email")}
					type="email"
					className="form-control"
					value={email}
				/>
			</div>
			<div className="form-group">
				<Link
					onClick={() =>
						setValues({
							...values,
							step: 4,
							email: "",
							userId: "",
							error: false,
						})
					}
				>
					Reset your password using ID
				</Link>
			</div>
			<button className="btn btn-primary">Submit</button>
		</form>
	);

	const step1Submit = async (e) => {
		e.preventDefault();
		const res = await forgot1({ email });
		const { message, error, questions, userId } = res.data;

		if (error) {
			setValues({ ...values, error: message });
			return;
		}

		setValues({
			...values,
			questions: { ...questions },
			user: userId,
			step: 2,
		});
	};

	const step2Form = () => {
		return (
			<form onSubmit={step2Submit}>
				<div className="form-group">
					<label className="text-muted">Question 1:</label>
					<input
						type="text"
						className="form-control"
						value={questions.q1.question}
						disabled
					/>
					<input
						required
						type="text"
						name="answer_1"
						className="form-control"
						onChange={handleChange("answer_1")}
					/>
				</div>

				<div className="form-group">
					<label className="text-muted">Question 2:</label>
					<input
						type="text"
						className="form-control"
						value={questions.q2.question}
						disabled
					/>
					<input
						required
						type="text"
						name="answer_2"
						className="form-control"
						onChange={handleChange("answer_2")}
					/>
				</div>

				<div className="form-group">
					<label className="text-muted">Question 3:</label>
					<input
						type="text"
						className="form-control"
						value={questions.q3.question}
						disabled
					/>
					<input
						required
						type="text"
						name="answer_3"
						className="form-control"
						onChange={handleChange("answer_3")}
					/>
				</div>

				<button className="btn btn-primary">Submit</button>
			</form>
		);
	};

	const step2Submit = (e) => {
		e.preventDefault();
		let correctAnswer = 0;

		for (let key in questions) {
			const { answer } = questions[key];

			switch (answer) {
				case answer_1:
					correctAnswer++;
					continue;

				case answer_2:
					correctAnswer++;
					continue;

				case answer_3:
					correctAnswer++;
					continue;

				default:
					continue;
			}
		}

		if (correctAnswer < 3) {
			setValues({ ...values, error: "Incorrect" });
			return;
		}

		setValues({ ...values, step: 3 });
	};

	const Step3Form = () => (
		<form onSubmit={step3Submit}>
			<div className="form-group">
				<label className="text-muted">New Password</label>
				<input
					name="password"
					onChange={handleChange("password")}
					type="password"
					className="form-control"
					value={password}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Confirm New Password</label>
				<input
					name="confirm_password"
					onChange={handleChange("confirm_password")}
					type="password"
					className="form-control"
					value={confirm_password}
				/>
			</div>

			<button className="btn btn-primary">Submit</button>
		</form>
	);

	const step3Submit = async (e) => {
		e.preventDefault();

		if (password !== confirm_password) {
			setValues({ ...values, error: "Incorrect Password" });
			return;
		}

		try {
			const res = await forgot2(user, password);
			const { data } = res;
			setValues({
				...values,
				message: data.message,
				success: true,
				password: "",
				confirm_password: "",
				step: 5,
			});
		} catch (error) {
			setValues({ ...values, error: "Something went wrong." });
		}
	};

	const resetWithUserId = () => {
		return (
			<form onSubmit={resetWithUserIdSubmit}>
				<div className="form-group">
					<label className="text-muted">User ID</label>
					<input
						name="userId"
						onChange={handleChange("userId")}
						type="text"
						className="form-control"
						value={userId}
					/>
				</div>
				<div className="form-group">
					<Link
						onClick={() =>
							setValues({
								...values,
								step: 1,
								email: "",
								userId: "",
								error: false,
							})
						}
					>
						Reset your password using Email
					</Link>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		);
	};

	const resetWithUserIdSubmit = async (e) => {
		e.preventDefault();
		const res = await forgot1(null, userId);
		const { message, error } = res.data;

		if (error) {
			setValues({ ...values, error: message });
			return;
		}

		setValues({
			...values,

			user: userId,
			step: 3,
		});
	};

	const renderForms = () => {
		switch (values.step) {
			case 1:
				return Step1Form();

			case 2:
				return step2Form();

			case 3:
				return Step3Form();

			case 4:
				return resetWithUserId();

			case 5:
				return showSuccess();
			default:
				return;
		}
	};

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none" }}
		>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div
			className="alert alert-info"
			style={{ display: success ? "" : "none" }}
		>
			{`${message}. Please `}
			<Link to="/signin">Sign In</Link> to continue.
		</div>
	);

	return (
		<Layout
			title="Password Reset"
			description="Password Reset for DLVL Studios"
			className="container col-md-8 offset-md-2"
		>
			{showError()}
			{renderForms()}
		</Layout>
	);
};

export default Reset;
