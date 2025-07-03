import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const events =[
    {
        id: 1,
        name: 'Tech Conference 2025',
        location: 'San Francisco, CA',
        urgency: 'High',
        date: '2025-08-12',
        skills: ['comminication'],
        description: 'Introduce new technologies'
    },
    {
        id: 2,
        name: 'Art Expo 2025',
        location: 'New York, NY',
        urgency: 'Low',
        date: '2025-09-05',
        skills: ['comminication'],
        description: 'introduce new art'
    },
];

function EventEdit(){
    const { id } = useParams();
    const navigate = useNavigate();
    const event = events.find(e => e.id === Number(id));

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [urgency, setUrgency] = useState("");
    const [date, setDate] = useState("");
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() =>{
        if (event) {
            setName(event.name);
            setLocation(event.location);
            setUrgency(event.urgency.toLowerCase());
            setDate(event.date);
            setSkills(event.skills);
            setDescription(event.description);
        }
    }, [event]);

    const addSkill = () =>{
        const val = newSkill;
        const isValid = /^[A-Za-z]+$/.test(val);
        if (val && isValid && !skills.includes(val)) {
            setSkills([...skills, val]);
            setNewSkill("");
        }
    };

    const removeSkill = (skill) =>{
        setSkills(skills.filter((s) => s !== skill));
    };

    if (!event){
        return <div className="p-[20px] text-center">Event not found.</div>;
    }

    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Event</h1>
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (skills.length === 0){
                            alert("Please add at least one required skill.");
                            return;
                        }
                        navigate("/admin/event");
                    }}
                >
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            required
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Urgency</label>
                            <select
                                required
                                value={urgency}
                                onChange={e => setUrgency(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select urgency</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Required Skills</label>
                        <div className="flex flex-wrap gap-2 gap-x-2">
                            {skills.map((skill) => (
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
                            rows={4}
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EventEdit;