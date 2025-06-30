function Navbar() {
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
							<a href="/volunteer/notification">Notification</a>
						</li>
						<li className="text-white ml-[20px] cursor-pointer">
							<a>Register</a>
						</li>
						<li className="text-white ml-[20px] cursor-pointer">
							<a>Event Management</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
  	);
}


export default Navbar;
