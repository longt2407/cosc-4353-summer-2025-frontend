import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AdminResetPwd(){
	const navigate = useNavigate();
    const token = localStorage.getItem("token");
	const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
	const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
	const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const getQuestion = async (e) => {
		try {
		   	e.preventDefault();
            let res = await axios.post(
                `${import.meta.env.VITE_API_URL}/admin/forget/question`, 
                {
					email: email
                },
                { headers: { Authorization: token } }
            );
			let data = res.data.data;
			setQuestion(data.reset_password_question);
			setStep(1);
        } catch(err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        }
    }

	const submit = async (e) => {
		try {
		   	e.preventDefault();
			if (password !== confirmPassword) {
				throw new Error("Passwords do not match!");
			}
            let res = await axios.post(
                `${import.meta.env.VITE_API_URL}/admin/forget`, 
                {
                    email: email,
					reset_password_answer: answer,
					password: password
                },
                { headers: { Authorization: token } }
            );
            alert("Password reset successfully!");
			localStorage.clear();
            navigate("/admin/login");
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
						<p>Forget Password</p>
                    </div>
                </div>
                { step === 0 && (
					<form 
						onSubmit={getQuestion}
						className="space-y-4"
					>
						<div>
							<div className="text-gray-700 mb-1">
								<span>Email</span>
							</div>
							<div>
								<input
									value={email}
									onChange={(e) => {setEmail(e.target.value)}}
									type="text"
									required
									className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
						>
							Next
						</button>
					</form>
				)}
				{step === 1 && (
					<form 
						onSubmit={submit}
						className="space-y-4"
					>
						<div>
							<div className="text-gray-700 mb-1">
								<span>Question</span>
							</div>
							<div>
								<input
									value={question}
									onChange={(e) => {setQuestion(e.target.value)}}
									type="text"
									required
									disabled
									className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
						<div>
							<div className="text-gray-700 mb-1">
								<span>Answer</span>
							</div>
							<div>
								<input
									value={answer}
									onChange={(e) => {setAnswer(e.target.value)}}
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
							Reset
						</button>
					</form>
				)}
            </div>
            <ToastContainer />
        </div>
    );
}

export default AdminResetPwd;
