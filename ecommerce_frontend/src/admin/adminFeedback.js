/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import FeedbackTable from "../core/FeedbackTable";
import { isAuthenticated } from "../auth";
import {
	getPendingFeedback,
	updateFeedback,
	deleteFeedback,
} from "../admin/apiAdmin";

const adminFeedback = () => {
	const [feedback, setFeedback] = useState([]);
	const { token } = isAuthenticated();

	const filterFeedback = (filter) => {
		if (feedback.length > 0) {
			const filtered = feedback.filter((item) => item.key !== filter);
			setFeedback(filtered);
		}
	};

	const handleUpdate = (feedbackId) => {
		console.log(feedbackId, "update");
		updateFeedback(feedbackId, token);
		filterFeedback(feedbackId);
	};

	const handleDelete = (feedbackId) => {
		console.log(feedbackId, "delete");
		deleteFeedback(feedbackId, token);
		filterFeedback(feedbackId);
	};

	useEffect(() => {
		const fetchFeedback = async () => {
			const { result } = await getPendingFeedback(token);
			console.log(result);

			const responseFeedback = result.map((item) => ({
				key: item._id,
				name: item.user.name,
				content: item.content,
				status: item.status ? "Published" : "Pending",
			}));

			setFeedback(responseFeedback);
		};

		fetchFeedback();

		return () => {
			setFeedback(null);
		};
	}, []);

	const {
		user: { name },
	} = isAuthenticated();

	return (
		<Layout
			title="Feedbacks"
			description={` ${name}, Please review the feedbacks here`}
			className="container-fluid"
		>
			<FeedbackTable
				data={feedback}
				onUpdate={handleUpdate}
				onDelete={handleDelete}
			/>
		</Layout>
	);
};

export default adminFeedback;
