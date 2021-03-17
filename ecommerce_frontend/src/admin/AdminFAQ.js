import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import React, { useState } from "react";
import FaqTable from "../core/FaqTable";

const AdminFAQ = () => {
	const {
		user: { name },
	} = isAuthenticated();

	return (
		<Layout
			title="FAQs"
			description={` ${name}, Please Edit the FAQS here`}
			className="container-fluid"
		>
			<FaqTable />
		</Layout>
	);
};
export default AdminFAQ;
