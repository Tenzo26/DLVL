import { Table, Space, Button } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { isAuthenticated } from "../auth";

const { Column } = Table;

function FeedbackTable({ data, onUpdate, onDelete }) {
	const {
		user: { _id },
	} = isAuthenticated();

	return (
		<Table dataSource={data}>
			<Column title="Name" dataIndex="name" key="firstName" />
			<Column title="Content" dataIndex="content" key="content" />
			<Column title="Status" dataIndex="status" key="status" />
			<Column
				title="Action"
				key="action"
				render={(text, record) => (
					<Space size="middle">
						{record.status === "Pending" ? (
							<Button
								type="primary"
								onClick={() => onUpdate(record.key)}
							>
								Publish
							</Button>
						) : (
							<Button
								style={{
									backgroundColor: "#52c41a",
									color: "#fff",
								}}
							>
								<Link
									to={`/admin/adminFeedback/${record.key}`}

									// onClick={() => onUpdate(record.key)}
								>
									Update
								</Link>
							</Button>
						)}

						<Button
							type="danger"
							onClick={() => onDelete(record.key)}
						>
							Delete
						</Button>
					</Space>
				)}
			/>
		</Table>
	);
}

export default FeedbackTable;
