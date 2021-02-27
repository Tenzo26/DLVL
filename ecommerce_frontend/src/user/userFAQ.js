/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../core/Layout";
import { useState, useEffect } from "react";
import { Collapse } from "antd";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getFaq } from "../admin/apiAdmin";

const { Panel } = Collapse;

const userFAQ = () => {
	const [faq, setFaq] = useState([]);

	useEffect(() => {
		const fetchFaq = async () => {
			const res = await getFaq();
			const { data: result } = res;
			setFaq(result.result);
		};

		fetchFaq();

		return () => {
			setFaq([]);
		};
	}, []);

	const renderFaq = () => {
		return faq.map((item) => (
			<Panel header={item.title} key={item.id}>
				<p>{item.content}</p>
			</Panel>
		));
	};

	return (
		<Layout
			title="FAQS"
			description={`Frequently Asked Questions`}
			className="container-fluid"
		>
			<Collapse defaultActiveKey={["0"]}>{renderFaq()}</Collapse>
		</Layout>
	);
};

export default userFAQ;
