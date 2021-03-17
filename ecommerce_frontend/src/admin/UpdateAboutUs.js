/* eslint-disable no-restricted-globals */
import React, {useState, useEffect} from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect, useHistory } from "react-router-dom";
import { updateAboutUs, removeAboutUs } from "./apiAdmin";
import { getDesc } from "../core/apiCore"

// changing about us description
const UpdateAboutUs = ({ match }) => {
	const [values, setValues] = useState({
		description: "",
		loading: false,
		error: false,
	});

	const history = useHistory(); 
	
	const { user, token } = isAuthenticated();

	const {
		description,
		loading,
		error,
		formData,
	} = values;

	const handleChange = () => (event) => {
		setValues({ ...values, description: event.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		
		if (!(description.length === 0 || !description.trim())) {
			updateAboutUs(user._id, token, description)
			.then((res) => {
					setValues({
						...values,
						loading: false,
						error: false,
					});
					history.push("/")
			});
		}
		else {
			alert("Description cannot be empty")
		}
	};

	const newPostForm = () => (
		<form className="mb-3" onSubmit={clickSubmit}>
			<h4>Update About Us</h4>
			<div className="form-group">
				<label className="text-muted">description</label>
				<textarea
					onChange={handleChange()}
					className="form-control"
					value={description}
					name="description"
				/>
			</div>

			<button type="submit" className="btn btn-outline-primary mr-5">
				Update Description
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

	const showLoading = () =>
		loading && (
			<div className="alert alert-success">
				<h2>Loading...</h2>
			</div>
		);

return (
    <Layout
        title="Dashboard"
        description={`Edit the About Us description here ${user.name}`}
        className="container-fluid"
    >
        <div className="row">
				<div className="col-md-8 offset-md-2">
					{showLoading()}
					{showError()}
					{newPostForm()}
				</div>
			</div>
   
        
    </Layout>
);
};


export default UpdateAboutUs;