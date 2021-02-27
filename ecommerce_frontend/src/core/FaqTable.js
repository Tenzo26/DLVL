import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import { addFaq } from "../admin/apiAdmin";
import { getFaq, updateFaq, deleteFaq } from "../admin/apiAdmin";
const EditableContext = React.createContext(null);

const styles = {
	marginBottom: "20px",
	padding: "12px",
};

const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};

const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = useContext(EditableContext);

	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex],
		});
	};

	const save = async () => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log("Save failed:", errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`,
					},
				]}
			>
				<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingRight: 24,
				}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}

	return <td {...restProps}>{childNode}</td>;
};

function FaqTable() {
	const [dataSource, setDatasource] = useState([]);

	useEffect(() => {
		const fetchFaq = async () => {
			const res = await getFaq();
			const faqs = res.data.result.map((item) => ({
				title: item.title,
				content: item.content,
				key: item._id,
			}));
			setDatasource(faqs);
		};

		fetchFaq();
	}, []);

	const [form] = Form.useForm();

	const columns = [
		{
			title: "title",
			dataIndex: "title",
			editable: true,
		},
		{
			title: "content",
			dataIndex: "content",
			editable: true,
		},

		{
			title: "operation",
			dataIndex: "operation",
			render: (_, record) =>
				dataSource.length >= 1 ? (
					<Popconfirm
						title="Sure to delete?"
						onConfirm={() => handleDelete(record.key)}
					>
						<Button type="danger">Delete</Button>
					</Popconfirm>
				) : null,
		},
	];

	const handleDelete = (key) => {
		const filter = dataSource.filter((item) => item.key !== key);
		setDatasource(filter);
		deleteFaq(key);
	};

	const onReset = () => {
		form.resetFields();
	};

	const handleAdd = async () => {
		let values = await form.validateFields();

		if (!values.title || !values.content) return;

		const newData = {
			key: Math.random(),
			title: values.title,
			content: values.content,
		};

		addFaq(values.title, values.content);

		setDatasource((prev) => [...prev, newData]);
		onReset();
	};

	const handleSave = (row) => {
		const newData = [...dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, { ...item, ...row });
		setDatasource(newData);

		updateFaq(row);
	};

	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell,
		},
	};

	const cols = columns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record) => ({
				record,
				editable: col.editable,
				dataIndex: col.dataIndex,
				title: col.title,
				handleSave: handleSave,
			}),
		};
	});

	return (
		<div>
			<Form form={form} onFinish={handleAdd}>
				<Form.Item name="title">
					<Input placeholder="Title" style={styles} />
				</Form.Item>
				<Form.Item name="content">
					<Input.TextArea placeholder="content" style={styles} />
				</Form.Item>
				<Button
					htmlType="submit"
					type="primary"
					style={{
						marginBottom: 16,
					}}
				>
					Add a row
				</Button>
			</Form>

			<Table
				components={components}
				rowClassName={() => "editable-row"}
				bordered
				dataSource={dataSource}
				columns={cols}
			/>
		</div>
	);
}

export default FaqTable;
