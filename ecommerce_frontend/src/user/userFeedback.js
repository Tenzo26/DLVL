/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
	Comment,
	Tooltip,
	Avatar,
	Input,
	Form,
	Button,
	Pagination,
	Table,
} from "antd";
import moment from "moment";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { deleteFeedback, _createFeedback } from "../admin/apiAdmin";
import { getPublishedFeedback } from "../user/apiUser";

const userFeedback = () => {
	const [feedback, setFeedback] = useState([]);
	const [currentItems, setCurrentItems] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const paginate = () => {
		const indexOfLastPost = currentPage * 5;
		const indexOfFirstPost = indexOfLastPost - 5;

		const currentFeedback = feedback.slice(
			indexOfFirstPost,
			indexOfLastPost
		);

		setCurrentItems(currentFeedback);
	};

	useEffect(() => {
		const fetchFeedback = async () => {
			const res = await getPublishedFeedback();
			setFeedback(res.data.result);
		};

		fetchFeedback();

		return () => {
			setFeedback([]);
		};
	}, []);

	useEffect(() => {
		paginate();
	}, [currentPage, feedback]);

	const handleChangePage = (page) => {
		console.log(currentItems);
		setCurrentPage(page);
		// paginate();
	};

	const renderFeedback = () => {
		return currentItems.map((item) => (
			<FeedbackCard
				userId={item.user._id}
				feedbackId={item._id}
				key={item._id}
				content={item.content}
				name={item.user.name}
				date={item.updatedAt}
			/>
		));
	};

	return (
		<Layout
			title="Feedbacks"
			description={` Welcome to Feedback page `}
			className="container-fluid"
		>
			<div className="userFeedback">
				<div className="userFeedback__container">
					{renderFeedback()}
					<Pagination
						defaultPageSize={5}
						style={{ margin: "25px 0" }}
						defaultCurrent={currentPage}
						total={feedback.length}
						onChange={handleChangePage}
					/>
				</div>
				<div className="userFeedback__form">
					<FeedbackForm />
				</div>
			</div>
		</Layout>
	);
};

const FeedbackCard = ({ userId, feedbackId, name, content, date }) => {
	const auth = isAuthenticated();

	if (auth) {
		const {
			user: { _id, role },
		} = isAuthenticated();

		const handleDelete = () => {
			deleteFeedback(feedbackId, null);
			location.reload();
		};

		const renderAction = () => {
			let actions = [];

			if (role === 1 && _id === userId) {
				actions.push(
					<Link to={`/admin/adminFeedback/${feedbackId}`}>
						<span className="comment-action">Edit</span>
					</Link>,
					<Link
						to="#"
						onClick={() => handleDelete()}
						style={{ marginLeft: "15px" }}
					>
						<span className="comment-action">Delete</span>
					</Link>
				);
			} else if (role === 0 && _id === userId) {
				actions.push(
					<Link to={`/user/userFeedback/${_id}/${feedbackId}`}>
						<span className="comment-action">Edit</span>
					</Link>,

					<Link
						to="#"
						onClick={() => handleDelete()}
						style={{ marginLeft: "15px" }}
					>
						<span className="comment-action">Delete</span>
					</Link>
				);
			}

			return actions;
		};

		return (
			<Comment
				style={{
					boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.1)",
					padding: "12px",
					marginTop: "15px",
				}}
				actions={renderAction()}
				author={name}
				avatar={<Avatar alt={name}>{name}</Avatar>}
				content={<p>{content}</p>}
				datetime={
					<Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
						<span>{moment(date).fromNow()}</span>
					</Tooltip>
				}
			/>
		);
	} else {
		return (
			<Comment
				author={name}
				avatar={<Avatar alt={name}>{name}</Avatar>}
				content={<p>{content}</p>}
				datetime={
					<Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
						<span>{moment(date).fromNow()}</span>
					</Tooltip>
				}
			/>
		);
	}
};

const FeedbackForm = () => {
	const history = useHistory();
	const [form] = Form.useForm();
	const { TextArea } = Input;

	const onReset = () => {
		form.resetFields();
	};

	const onFinish = async () => {
		if (!isAuthenticated()) {
			history.push("/signin");
			return;
		}

		const {
			token,
			user: { _id },
		} = isAuthenticated();

		try {
			let values = await form.validateFields();
			_createFeedback(token, _id, values.feedback);
			onReset();
		} catch (errInfo) {
			console.log("Error:", errInfo);
		}
	};

	return (
		<Form form={form} layout="horizontal" onFinish={onFinish}>
			<Form.Item
				name="feedback"
				label="Feedback"
				labelCol={{
					span: 6,
				}}
				wrapperCol={{
					span: 16,
				}}
			>
				<TextArea rows={6} />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					span: 14,
					offset: 6,
				}}
			>
				<Button htmlType="submit" type="primary">
					Submit
				</Button>
				&nbsp;&nbsp;&nbsp;
				<Button htmlType="button" onClick={onReset}>
					Reset
				</Button>
			</Form.Item>
		</Form>
	);
};

export default userFeedback;
