import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function AdminRegister() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const submit  = (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            toast.error("Passwords do not match!");
        } else {
            navigate("/admin/login");
        }
    }

    return(
        <div className="flex justify-center items-center h-full">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="mb-6 ">
                    <div className="text-2xl font-bold text-center">
                        <span>Create Admin Account</span>
                    </div>
                </div>
                <form 
                    onSubmit={submit}
                    className="space-y-4"
                >
                    <div>
                        <div className="text-gray-700 mb-1">
                            <span>Username</span>
                        </div>
                        <div>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-700 mb-1">
                            <span>Password</span>
                        </div>
                        <div>
                            <input
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-700 mb-1">
                            <span>Confirm Your Password</span>
                        </div>
                        <div>
                            <input
                                value={confirmPassword}
                                onChange={(e) => {setConfirmPassword(e.target.value)}}
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Sign up
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default AdminRegister;
