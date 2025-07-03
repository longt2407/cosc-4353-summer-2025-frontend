import { useNavigate } from "react-router-dom";

const roleEnum = {
	ADMIN: "admin",
	VOLUNTEER: "volunteer"
}

function AdminLogin(){
    const navigate = useNavigate();

    const submit  = (e) => {
        e.preventDefault();
        localStorage.setItem("is_login", "true");
        localStorage.setItem("user", JSON.stringify({
            role: roleEnum.ADMIN
        }));
        navigate("/admin/event")
    }

    return(
        <div className="flex justify-center items-center h-full">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Log In</h1>
                <form 
                    onSubmit={submit}
                    className="space-y-4"
                >
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
                    <div className="text-right">
                        <span>
                            <a href="/">Forget your password?</a>
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Log In
                    </button>
                </form>

                <button
                    onClick={() => navigate('/admin/register')}
                    type="button"
                    className="w-full mt-4 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"   
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default AdminLogin;
