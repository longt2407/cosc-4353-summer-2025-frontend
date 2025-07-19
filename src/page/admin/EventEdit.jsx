import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EventEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const tzOffset = (new Date()).getTimezoneOffset() * 60 * 1000; // input type date is interpreted as a UTC time
    const token = localStorage.getItem("token");
    const [newSkill, setNewSkill] = useState("");
    const [event, setEvent] = useState({
        name: "",
        location: "",
        urgency: "",
        date: "",
        skill: [],
        description: ""
    });

    const getEvent = async () => {
        try {
            let res = await axios.get(
                `${import.meta.env.VITE_API_URL}/event/${id}`,
                { headers: { Authorization: token } }
            );
            let data = res.data.data;
            setEvent({
                name: data.name,
                location: data.location,
                urgency: data.urgency.toString(),
                date: new Date(data.date).toISOString().substring(0, 10),
                skill: data.skill,
                description: data.description
            });
        } catch (err) {
            alert("Event not found");
            navigate("/admin/event");
        }
    };
    useEffect(() => {
        getEvent();
    }, [id, token, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(prev => ({ ...prev, [name]: value }));
    };

    const addSkill = () => {
        const val = newSkill;
        const isValid = /^[A-Za-z]+$/.test(val);
        if (val && isValid && !event.skill.includes(val)) {
            setEvent(prev => ({ ...prev, skill: [...prev.skill, val] }));
            setNewSkill("");
        }
    };
    const removeSkill = (skill) => {
        setEvent(prev => ({ ...prev, skill: prev.skill.filter(s => s !== skill) }));
    };

    // Submit updated event
    const submit = async (e) => {
        e.preventDefault();
        if (event.skill.length < 1) {
            alert("Please add at least one skill!");
            return;
        }
        try {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/event/${id}`,
                {
                    ...event,
                    urgency: parseInt(event.urgency),
                    date: new Date(event.date).getTime()
                },
                { headers: { Authorization: token } }
            );
            alert("Event updated successfully!");
            navigate("/admin/event");
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert(err.message);
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Event</h1>
                <form className="space-y-4" onSubmit={submit}>
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
                        <input
                            name="location"
                            value={event.location}
                            onChange={handleChange}
                            type="text"
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
                                <option value="">Select urgency</option>
                                <option value="0">Low</option>
                                <option value="1">Medium</option>
                                <option value="2">High</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Date</label>
                            <input
                                name="date"
                                value={event.date}
                                onChange={handleChange}
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
                                    placeholder="Communication"
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
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EventEdit;