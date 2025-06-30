function Homepage() {
	return (
		<div className="flex flex-col justify-center h-full">
			<div>
				<div className="text-center">
					<span className="text-center">Please Log In To Continue</span>
				</div>
				<div className="text-center mt-[20px]">
					<button className="px-3 py-2 text-white rounded cursor-pointer bg-blue-500 hover:bg-blue-700">
						Log In As Volunteer
					</button>
					<button className="px-3 py-2 text-white rounded cursor-pointer bg-blue-500 hover:bg-blue-600 ml-[20px]">
						Log In As Admin
					</button>
				</div>
			</div>
		</div>
	);
}

export default Homepage;
