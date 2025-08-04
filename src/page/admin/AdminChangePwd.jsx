import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AdminChangePwd(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
	const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submit = async (e) => {
		try {
		   	e.preventDefault();
			if (password !== confirmPassword) {
				throw new Error("Passwords do not match!");
			}
            let res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/admin/password`, 
                {
                    password
                },
                { headers: { Authorization: token } }
            );
			alert("Changes have been saved successfully!");
			localStorage.clear();
            navigate("/admin/login");;
        } catch(err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        }
    }

    return(
        <div className="flex justify-center items-center h-full">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="mb-6 ">
                    <div className="text-2xl font-bold text-center">
                        <p>Admin</p>
						<p>Change Password</p>
                    </div>
                </div>
                <form 
                    onSubmit={submit}
                    className="space-y-4"
                >
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
                        Change
                    </button>
                </form>
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default AdminChangePwd;
