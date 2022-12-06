import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from "react-router";
import './login.css';
const { Option } = Select;

const UserRegister = () => {
    const navigate = useNavigate();
    const onFinish = async(values) => {
        const response = await fetch(`http://localhost:5000/signUp`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        response.json().then(((data) => {
            if (data.status == '201') {
                navigate("/login")
            } else if (data.status == '400') {
                alert(data.message)
            }
        }));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="login-form"
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
            label="Password"
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            wrapperCol={{
            offset: 8,
            span: 16,
            }}
        >
            <Button type="primary" htmlType="submit" className="login-form-button">
            Register
            </Button>
        </Form.Item>
        </Form>
    );
};
export default UserRegister;