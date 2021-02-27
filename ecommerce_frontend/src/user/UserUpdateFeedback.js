/* eslint-disable no-undef */
import { useState } from "react";
import Layout from "../core/Layout";
import { useHistory, useParams, Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { updateById } from "../user/apiUser";

function UserUpdateFeedback() {
	const [values, setValues] = useState("");

	const history = useHistory();

	const params = useParams();

	const {
		user: { name },
	} = isAuthenticated();

	const handleChange = (e) => {
		setValues(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await updateById(params.feedbackId, values);

		if (!res.error) {
			history.goBack();
		}
	};

	return (
		<Layout
			title="Edit Feedback"
			description={` ${name}, Please edit the feedbacks here`}
			className="container-fluid"
		>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label className="text-muted">Content</label>
					<input
						required
						name="content"
						onChange={handleChange}
						type="text"
						className="form-control"
						value={values}
					/>
				</div>
				<div className="form-group">
					<Link to="#" onClick={() => history.goBack()}>
						Go Back
					</Link>
				</div>
				<button className="btn btn-primary">Update</button>
			</form>
		</Layout>
	);
}

export default UserUpdateFeedback;
