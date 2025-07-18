import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const roleEnum = {
	VOLUNTEER: 0,
	ADMIN: 1,
}

function Navbar() {
    const navigate = useNavigate();
	// hardcoded for now until later implementation for notification (react context?)
	const unreadCount = 3;
	const isLogin = JSON.parse(localStorage.getItem("is_login"));
	const user =  JSON.parse(localStorage.getItem("user")) || {};

	const logout = () => {
		localStorage.clear();
		navigate("/");
	}

  	return (
		<nav className="sticky top-0 z-50 bg-gray-800 w-full border-gray-200 p-[20px] flex justify-center">
			<div className="flex justify-between container">
				<div>
					<div className="font-extrabold text-white">
						<span>COSC4353</span>
					</div>
				</div>
				<div className="grow">
					<ul className="flex flex-row-reverse"> 
						{ isLogin && (
							<li className="text-white ml-[20px] cursor-pointer">
								<span
									onClick={logout} 
								>
									
									Logout
								</span>
							</li>
						)}
						{ isLogin && user.role === roleEnum.ADMIN && (
							<li className="text-white ml-[20px] cursor-pointer">
								<a href="/admin/profile">Profile</a>
							</li>
						)}
						{ isLogin && user.role === roleEnum.VOLUNTEER && (
							<li className="text-white ml-[20px] cursor-pointer">
								<a href="/volunteer/profile">Profile</a>
							</li>
						)}
						{ isLogin && user.role === roleEnum.VOLUNTEER && (
							<li className="text-white ml-[20px] cursor-pointer">
								<a href="/volunteer/history">History</a>
							</li>
						)}
						{ isLogin && user.role === roleEnum.VOLUNTEER && (
							<li className="text-white ml-[20px] cursor-pointer">
								<a href="/volunteer/notification" className="relative inline-block"><span>Notification</span>
									{unreadCount > 0 && (
										<span className="absolute -top-1 -right-3.5 text-xs text-white bg-red-600 px-1.5 py-0.5 rounded-full leading-none">{unreadCount}</span>
									)}
								</a>
							</li>
						)}
						{ isLogin && user.role === roleEnum.ADMIN && (
							<li className="text-white ml-[20px] cursor-pointer">
								<a href="/admin/event">Event Management</a>
							</li>
						)}
						{ !isLogin && (
							<li className="text-white ml-[20px] cursor-pointer">
								<a href="/">Home</a>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
  	);
}


export default Navbar;
