function Homepage(){
	return (
		<div className="flex flex-col justify-center h-full">
			<div>
				<div className="text-center">
					<span className="text-center">Please Log In To Continue</span>
				</div>
				<div className="text-center mt-[20px]">
					<a
						href="/volunteer/login"
						className="px-3 py-2 text-white rounded cursor-pointer bg-blue-500 hover:bg-blue-700 inline-block"
					>
						Log In As Volunteer
					</a>

					<a
						href="/admin/login"
						className="px-3 py-2 text-white rounded cursor-pointer bg-blue-500 hover:bg-blue-600 inline-block ml-[20px]"
					>
						Log In As Admin
					</a>
				</div>
			</div>
		</div>
	);
}

export default Homepage;
