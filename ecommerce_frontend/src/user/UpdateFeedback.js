import { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { useHistory, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";

function UpdateFeedback() {
	const history = useHistory();
	const params = useParams();

	console.log("params");

	const [feedback, setFeedback] = useState();

	useEffect(() => {
		const fetchFeedback = async (id) => {};
	});

	const {
		user: { name },
	} = isAuthenticated();

	console.log(isAuthenticated());

	return (
		<Layout
			title="Edit Feedback"
			description={` ${name}, Please edit the feedbacks here`}
			className="container-fluid"
		>
			<div>
				<h1>Update Feedbacks</h1>
			</div>
		</Layout>
	);
}

export default UpdateFeedback;
