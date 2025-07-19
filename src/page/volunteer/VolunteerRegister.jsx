import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function VolunteerRegister() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [step, setStep] = useState(0);
    const [verifyToken, setVerifyToken] = useState("");

    const submit = async (e) => {
        try {
		   	e.preventDefault();
			if (password !== confirmPassword) {
				throw new Error("Passwords do not match!");
			}
            let res = await axios.post(
                `${import.meta.env.VITE_API_URL}/volunteer/register`, 
                {
                    email: email,
					password: password,
                    reset_password_question: question,
                    reset_password_answer: answer
                },
                { headers: { Authorization: token } }
            );
            let data = res.data.data;
            setVerifyToken(data.token);
            setStep(1);
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
                        <span>Create Volunteer Account</span>
                    </div>
                </div>
                { step === 0 && (
                    <form 
                        onSubmit={submit}
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
                        <div>
                            <div className="text-gray-700 mb-1">
                                <span>Security Question</span>
                            </div>
                            <div>
                                <input
                                    value={question}
                                    onChange={(e) => {setQuestion(e.target.value)}}
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="text-gray-700 mb-1">
                                <span>Security Answer</span>
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
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Sign up
                        </button>
                    </form>
                )}
                { step === 1 && (
                    <div>
                        <div className="text-center">
                            <p>Please click the link below to complete your account creation.</p>
                            <a
                                className="underline" 
                                href={`/volunteer/verify?token=${verifyToken}`}
                            >
                                Click Here
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default VolunteerRegister;
