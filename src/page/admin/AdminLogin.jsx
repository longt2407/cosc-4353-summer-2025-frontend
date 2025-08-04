import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function AdminLogin(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit  = async (e) => {
        try {
            e.preventDefault();
            let res = await axios.post(
                `${import.meta.env.VITE_API_URL}/admin/login`, 
                {
                    email, 
                    password
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            let data = res.data.data;
            localStorage.setItem("is_login", "true");
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/admin/event")
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
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Log In</h1>
                <form 
                    onSubmit={submit}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-gray-700 mb-1">Username</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="text-right">
                        <span>
                            <a href="/admin/forget-password">Forget your password?</a>
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
            <ToastContainer position="bottom-right"/>
        </div>
    );
}

export default AdminLogin;
