import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;
 
export default function Edit() {
	const params = useParams();
	const navigate = useNavigate();

	const [form] = Form.useForm();
 
	useEffect(() => {
		async function fetchData() {
			const id = params.id.toString();
			const response = await fetch(`http://localhost:5000/user/${id}`);
		
			if (!response.ok) {
				const message = `An error has occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}
		
			const record = await response.json();

			if (!record) {
				window.alert(`Record with id ${id} not found`);
				navigate("/");
				return;
			}
		
			form.setFieldsValue({...record.user});
		}
		
		fetchData();
		
		return;
	}, [params.id]);
 
	const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
 
	async function onSubmit(values) {
		// This will send a post request to update the data in the database.
		await fetch(`http://localhost:5000/user/${params.id}`, {
			method: "PUT",
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(values),
		});
		
		navigate("/");
	}
 
	return (
		<Form
			name="basic"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			initialValues={{
				remember: true,
			}}
			onFinish={onSubmit}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			className="login-form"
			form={form}
		>
		<Form.Item
			label="First Name"
			name="firstName"
			rules={[
			{
				required: true,
				message: 'Please input your first name!',
			},
			]}
		>
			<Input />
		</Form.Item>
		<Form.Item
			label="Last Name"
			name="lastName"
			rules={[
			{
				required: true,
				message: 'Please input your last name!',
			},
			]}
		>
			<Input />
		</Form.Item>      
		<Form.Item
			label="Email"
			name="email"
			rules={[
			{
				required: true,
				message: 'Please input your eamail!',
			},
			]}
		>
			<Input />
		</Form.Item>

		<Form.Item
			label="Mobile"
			name="mobile"
			rules={[
			{
				required: true,
				message: 'Please input your mobile!',
			},
			]}
		>
			<Input />
		</Form.Item>

		<Form.Item 
            name="role" 
            label="Role" 
            rules={[
                { 
                    required: true,
                    message: 'Please select a role',
                }
            ]}>
            <Select
                placeholder="Select a option and change input text above"
                // onChange={onGenderChange}
                allowClear
            >
                <Option value="client">Client</Option>
                <Option value="admin">Admin</Option>
            </Select>
        </Form.Item>

		<Form.Item
			wrapperCol={{
			offset: 8,
			span: 16,
			}}
		>
			<Button type="primary" htmlType="submit" className="login-form-button">
			Update
			</Button>
		</Form.Item>
		</Form>
	);
}