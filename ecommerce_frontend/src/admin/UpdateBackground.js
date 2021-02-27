/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect, useHistory } from "react-router-dom";
import { changeBg, removeBg } from "./apiAdmin";

const UpdateBackground = ({ match }) => {
	const [values, setValues] = useState({
		photo: "",
		formData: new FormData(),
		loading: false,
		error: false,
	});

	const history = useHistory();

	const { user, token } = isAuthenticated();

	const { loading, error, photo, formData } = values;

	const handleChange = (name) => (event) => {
		const value =
			name === "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();

		if (photo === "" || photo === undefined) return;

		changeBg(user._id, token, formData).then((res) => {
			if (res.error) {
				setValues({ ...values, error: res.error });
			} else {
				history.push("/");

				setValues({
					...values,
					photo: "",
					loading: false,
					error: false,
				});
			}
		});
	};

	const handleRemoveBg = () => {
		removeBg(user._id, token).then((res) => {
			if (!res.error) history.push("/");
		});
	};

	const newPostForm = () => (
		<form className="mb-3" onSubmit={clickSubmit}>
			<h4>Update Background Image</h4>
			<div className="form-group">
				<label className="btn btn-secondary">
					<input
						onChange={handleChange("photo")}
						type="file"
						name="photo"
						accept="image/*"
					/>
				</label>
			</div>

			<button type="submit" className="btn btn-outline-primary mr-5">
				Update Background
			</button>

			<button
				onClick={handleRemoveBg}
				className="btn btn-outline-danger "
			>
				Remove Background
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

	// const showSuccess = () => (
	// 	<div
	// 		className="alert alert-info"
	// 		style={{ display: createdProduct ? "" : "none" }}
	// 	>
	// 		<h2>{`${createdProduct}`} is updated!</h2>
	// 	</div>
	// );

	const showLoading = () =>
		loading && (
			<div className="alert alert-success">
				<h2>Loading...</h2>
			</div>
		);

	return (
		<Layout title="Update Background" description={`G'day ${user.name}.`}>
			<div className="row">
				<div className="col-md-8 offset-md-2">
					{showLoading()}
					{/* {showSuccess()} */}
					{showError()}
					{newPostForm()}
				</div>
			</div>
		</Layout>
	);
};

export default UpdateBackground;
