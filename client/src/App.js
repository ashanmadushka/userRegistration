import React, {useState} from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
// import RecordList from "./components/recordList";
import UserRegister from "./components/register";
import UserLogin from "./components/login";
import RecordList from "./components/recordList"
import Edit from "./components/edit";
 
function setUserData(userToken) {
	sessionStorage.setItem('user', JSON.stringify(userToken));
}
  
function getUserData() {
	return sessionStorage.getItem('user');
}

const App = () => {
	const data = getUserData();
	const userData = JSON.parse(data);

	if (!userData) {
		return (
			<Routes>
				<Route exact path="/login" element={<UserLogin setUserData={setUserData}/>} />
				<Route exact path="/register" element={<UserRegister />} />
			</Routes>
		)
	}

	return (
		<div>
			<Routes>
				<Route exact path="/login" element={<UserLogin setUserData={setUserData}/>} />
				<Route exact path="/register" element={<UserRegister />} />
				<Route path="/" element={<RecordList role={userData?.role} authUserId={userData?.id} />} />
				<Route path="/edit/:id" element={<Edit />} />
			</Routes>
		</div>
	);
};
 
export default App;