function Navbar() {
	//hardcoded for now until later implementation for notification(react context?)
	const unreadCount = 2;

  	return (
		<nav className="sticky top-0 z-50 bg-gray-800 w-full border-gray-200 p-[20px] flex justify-center">
			<div className="flex container">
				<div className="flex flex-row  grow">
					<div className="font-extrabold text-white">
						<span>COSC4353</span>
					</div>
				</div>
				<div className="grow">
					<ul className="flex flex-row-reverse"> 
						<li className="text-white ml-[20px] cursor-pointer">
							<a>Profile</a>
						</li>
						<li className="text-white ml-[20px] cursor-pointer">
							<a href="/volunteer/history">History</a>
						</li>
						<li className="text-white ml-[20px] cursor-pointer">
							<a href="/volunteer/notification" className="relative inline-block"><span>Notification</span>
								{unreadCount > 0 && (
									<span className="absolute -top-1 -right-3.5 text-xs text-white bg-red-600 px-1.5 py-0.5 rounded-full leading-none">{unreadCount}</span>
								)}
							</a>
						</li>
						<li className="text-white ml-[20px] cursor-pointer">
							<a>Register</a>
						</li>
						<li className="text-white ml-[20px] cursor-pointer">
							<a href="/admin/event">Event Management</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
  	);
}


export default Navbar;
