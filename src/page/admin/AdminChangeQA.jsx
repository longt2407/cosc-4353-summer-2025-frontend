import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function AdminChangeQA(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
	const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [confirmAnswer, setConfirmAnswer] = useState("");

    const submit = async (e) => {
		try {
		   	e.preventDefault();
            if (answer !== confirmAnswer) {
				throw new Error("Security answers do not match!");
			}
            let res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/admin/qa`, 
                {
                    reset_password_question: question,
					reset_password_answer: answer
                },
                { headers: { Authorization: token } }
            );
            alert("Changes have been saved successfully!");
            navigate("/admin/profile");
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
						<p>Change Security Question</p>
                    </div>
                </div>
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
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-700 mb-1">
                            <span>Confirm Answer</span>
                        </div>
                        <div>
                            <input
                                value={confirmAnswer}
                                onChange={(e) => {setConfirmAnswer(e.target.value)}}
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
            <ToastContainer />
        </div>
    );
}

export default AdminChangeQA;
