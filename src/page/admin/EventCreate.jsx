import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import moment from "moment";

function EventCreate() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [newSkill, setNewSkill] = useState("");
    const [event, setEvent] = useState({
        name: "",
        description: "",
        location: "",
        skill: [],
        urgency: "",
        date: moment.utc(moment().format("YYYY-MM-DD") + " " + "12:00:00", "YYYY-MM-DD HH:mm:ss")
    });

    const addSkill = () =>{
        const val = newSkill;
        const isValid = /^[A-Za-z]+$/.test(val);

        if (val && isValid && !event.skill.includes(val)) {
            setEvent((prev) => ({
                ...prev,
                skill: [...event.skill, val]
            }));
            setNewSkill("");
        }
    };

    const removeSkill = (skill) =>{
        setEvent((prev) => ({
            ...prev,
            skill: event.skill.filter((s) => s !== skill)
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submit = async (e) => {
        try {
            e.preventDefault();
            if (event.skill.length < 1) {
                throw new Error("Please add at least one skill!")
            }
            let res = await axios.post(
                `${import.meta.env.VITE_API_URL}/event`,
                {
                    name: event.name,
                    description: event.description,
                    location: event.location,
                    skill: event.skill,
                    urgency: parseInt(event.urgency),
                    date: event.date.toISOString()
                },
                { headers: { Authorization: token } },
            );
            let data = res.data.data;
            alert("Event created successfully!");
            navigate("/admin/event");
        } catch(err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Create New Event</h1>
                <form
                    className="space-y-4"
                    onSubmit={submit}
                >
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            name="name"
                            value={event.name}
                            onChange={handleChange}
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Location</label>
                        <textarea
                            name="location"
                            value={event.location}
                            onChange={handleChange}
                            rows={1}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Urgency</label>
                            <select
                                name="urgency"
                                value={event.urgency}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option disabled selected value="">Select</option>
                                <option value="0">Low</option>
                                <option value="1">Medium</option>
                                <option value="2">High</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Date</label>
                            <input
                                name="date"
                                value={event.date.format("YYYY-MM-DD")}
                                onChange={(e) => { 
                                    setEvent((prev) => ({
                                        ...prev,
                                        date: moment.utc(e.target.value + " " + "12:00:00", "YYYY-MM-DD HH:mm:ss")
                                    }));
                                }}
                                type="date"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Required Skills</label>
                        <div className="flex flex-wrap gap-2 gap-x-2">
                            {event.skill.map((skill) => (
                                <div
                                    key={skill}
                                    className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded"
                                >
                                    <span>{skill}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="ml-2 text-blue-700 hover:text-blue-900 font-bold"
                                        aria-label={`Remove skill ${skill}`}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <div className="flex">
                                <input
                                    type="text"
                                    value={newSkill}
                                    onChange={(e) =>
                                        setNewSkill(e.target.value.replace(/[^A-Za-z]/g, ""))
                                    }
                                    placeholder="Comminication"
                                    className="w-[160px] flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={addSkill}
                                    className="ml-2 bg-green-500 text-white px-4 rounded hover:bg-green-600"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={event.description}
                            onChange={handleChange}
                            rows={4}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Create
                    </button>
                </form>
            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    );
}

export default EventCreate;