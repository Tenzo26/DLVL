/* eslint-disable no-undef */
import { useState } from "react";
import Layout from "../core/Layout";
import { useHistory, useParams, Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { updateById } from "../admin/apiAdmin";

function AdminUpdateFeedback() {
	const [values, setValues] = useState({
		content: "",
		status: false,
	});

	const history = useHistory();

	const params = useParams();

	const {
		user: { name },
	} = isAuthenticated();

	const handleChange = (e) => {
		const key = e.target.name;
		let value = e.target.value;

		if (value === "true" || value === "false") {
			value = JSON.parse(value);
		}

		setValues({
			...values,
			[key]: value,
		});
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
						name="content"
						onChange={handleChange}
						type="text"
						className="form-control"
						value={values.content}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Status</label>
					<select
						name="status"
						className="form-control"
						onChange={handleChange}
					>
						<option value={false}>Pending</option>
						<option value={true}>Published</option>
					</select>
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

export default AdminUpdateFeedback;
