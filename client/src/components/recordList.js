import React, {useState, useEffect} from 'react';
import { Space, Table, Tag } from 'antd';
import './recordList.css';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
    key: 'moblie',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a href={`/edit/${record._id}`}>Edit {record.name}</a>
		{ record.role === "admin" &&
        	<a>Delete</a>
		}
      </Space>
    ),
  },
];

const RecordList = (props) => {
	const [records, setRecords] = useState([]);
	
	// This method fetches the records from the database.
	useEffect(() => {
		async function getRecords() {
			if (props.role === 'admin') {
				var response = await fetch(`http://localhost:5000/user/get-all-client`);

				if (!response.ok) {
					const message = `An error occurred: ${response.statusText}`;
					window.alert(message);
					return;
				}
			
				const records = await response.json();
				setRecords(records);
			} else {
				var response = await fetch(`http://localhost:5000/user/${props.authUserId}`);
				const records = await response.json();
				setRecords([records.user]);
			}
		}
		
		getRecords();
		
		return;
	}, [records.length]);
	
	return (
		<Table className="user-table" columns={columns} dataSource={records} />
	)
};
export default RecordList;