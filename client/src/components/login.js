import React from 'react';
import './login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import {
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons';

function UserLogin({setUserData}){

    const handleSubmit = async(values) => {
		const response = await fetch(`http://localhost:5000/login`, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		});

		response.json().then(((data) => {
			if (data.status == 200) {
				setUserData(data.data);
				window.location.assign("http://localhost:3000");
				
			} else {
				alert(data.message)
				setUserData({});
			}
		}));
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
        <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed} className="login-form">
			<Form.Item
				name="email"
				rules={[{required: true, message: 'Please input your username!',}]}
			>
				<Input
				prefix={<UserOutlined type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
				placeholder="Username"
				/>
        	</Form.Item>
			<Form.Item 
				name="password"
				rules={[{ required: true, message: 'Please input your Password!' }]}
			>
				<Input.Password
					prefix={<LockOutlined type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item>
			<Button
				type="primary"
				htmlType="submit"
				className="login-form-button"
			>
				Log in
			</Button>
			Or <a href="/register">register now!</a>
			</Form.Item>
      </Form>
    );
}

export default UserLogin;


// ReactDOM.render(<LoginDemo />, mountNode);

// #scaffold-src-components-Login-demo-basic .login-warp{
//   max-width: 360px;
//   margin: auto;
// }
// #scaffold-src-components-Login-demo-basic .icon {
//   display: inline-block;
//   width: 24px;
//   height: 24px;
//   background: url('https://gw.alipayobjects.com/zos/rmsportal/itDzjUnkelhQNsycranf.svg');
//   margin-left: 16px;
//   vertical-align: middle;
//   cursor: pointer;
// }
// #scaffold-src-components-Login-demo-basic .icon-alipay {
//   background-position: -24px 0;
// }
// #scaffold-src-components-Login-demo-basic .icon-alipay:hover {
//   background-position: 0 0;
// }
// #scaffold-src-components-Login-demo-basic .icon-taobao {
//   background-position: -24px -24px;
// }
// #scaffold-src-components-Login-demo-basic .icon-taobao:hover {
//   background-position: 0 -24px;
// }
// #scaffold-src-components-Login-demo-basic .icon-weibo {
//   background-position: -24px -48px;
// }
// #scaffold-src-components-Login-demo-basic .icon-weibo:hover {
//   background-position: 0 -48px;
// }