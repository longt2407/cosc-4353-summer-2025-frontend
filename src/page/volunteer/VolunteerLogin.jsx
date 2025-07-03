import { useNavigate } from "react-router-dom";

function VolunteerLogin(){
    const navigate = useNavigate();

    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Log In
                    </button>
                </form>

                <button
                    onClick={() => navigate('/volunteer/register')}
                    type="button"
                    className="w-full mt-4 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"   
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default VolunteerLogin;
