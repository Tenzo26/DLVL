import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { adminSignup } from "../auth";

const SignupAdmin = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		question_1: "What Is your favorite book",
		question_2: "What was the name of your first/current/favorite pet",
		question_3: "Where did you go to high school/college",
		answer_1: "",
		answer_2: "",
		answer_3: "",
		error: "",
		success: false,
	});

	const {
		name,
		email,
		password,
		error,
		success,
		question_1,
		question_2,
		question_3,
		answer_1,
		answer_2,
		answer_3,
	} = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();

		setValues({ ...values, error: false });

		adminSignup({
			name,
			email,
			password,
			question_1,
			question_2,
			question_3,
			answer_1,
			answer_2,
			answer_3,
		}).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
			} else {
				setValues({
					...values,
					name: "",
					email: "",
					password: "",
					question_1: "What Is your favorite book",
					question_2:
						"What was the name of your first/current/favorite pet",
					question_3: "Where did you go to high school/college",
					answer_1: "",
					answer_2: "",
					answer_3: "",
					error: "",
					success: true,
				});
			}
		});
	};

	const signUpForm = () => (
		<form>
			<div className="form-group">
				<label className="text-muted">Name</label>
				<input
					onChange={handleChange("name")}
					type="text"
					className="form-control"
					value={name}
				/>
			</div>

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
				<label className="text-muted">Password</label>
				<input
					onChange={handleChange("password")}
					type="password"
					className="form-control"
					value={password}
				/>
			</div>

			<div className="form-group">
				<label className="text-muted">Question 1:</label>
				<select
					className="form-control"
					name="question_1"
					required
					onChange={handleChange("question_1")}
				>
					<option selected value="What Is your favorite book">
						What Is your favorite book?
					</option>
					<option value="What is the name of the road you grew up on">
						What is the name of the road you grew up on?
					</option>
					<option value="What is your mother’s maiden name">
						What is your mother’s maiden name?
					</option>
				</select>
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
				<select
					className="form-control"
					name="question_2"
					required
					onChange={handleChange("question_2")}
				>
					<option
						selected
						value="What was the name of your first/current/favorite pet"
					>
						What was the name of your first/current/favorite pet?
					</option>
					<option value="What was the first company that you worked for">
						What was the first company that you worked for?
					</option>
					<option value="Where did you meet your spouse">
						Where did you meet your spouse?
					</option>
				</select>
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
				<select
					className="form-control"
					name="question_3"
					required
					onChange={handleChange("question_3")}
				>
					<option
						selected
						value="Where did you go to high school/college"
					>
						Where did you go to high school/college?
					</option>
					<option value="What is your favorite food">
						What is your favorite food?
					</option>
					<option value="What city were you born in">
						What city were you born in?
					</option>
					<option value="Where is your favorite place to vacation">
						Where is your favorite place to vacation?
					</option>
				</select>
				<input
					required
					type="text"
					name="answer_3"
					className="form-control"
					onChange={handleChange("answer_3")}
				/>
			</div>

			<button onClick={clickSubmit} className="btn btn-primary">
				Submit
			</button>
		</form>
	);

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
			Successfully created your account. Please{" "}
			<Link to="/signin">Sign In</Link> to continue.
		</div>
	);

	return (
		<Layout
			title="Admin Sign Up"
			description="Register for DLVL Studios"
			className="container col-md-8 offset-md-2"
		>
			{showSuccess()}
			{showError()}
			{signUpForm()}
		</Layout>
	);
};

export default SignupAdmin;
