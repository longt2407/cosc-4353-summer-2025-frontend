import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const allVolunteers = [
    { id: 1, name: "Alice", assigned: true, skills: ["communication", "technology"], preferences: "lorem ipsum" },
    { id: 2, name: "Bob", assigned: false, skills: ["organization"], preferences: "lorem ipsum" },
    { id: 3, name: "Charlie", assigned: false, skills: ["management"], preferences: "lorem ipsum" },
];

function EventAssign() {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [event, setEvent] = useState(null);
    const [volunteers, setVolunteers] = useState(allVolunteers);

    const getEvent = async (id, token, setEvent) => {
    try {
        const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/event/${id}`,
        { headers: { Authorization: token } }
        );
        setEvent(res.data.data);
    } catch (err) {
        setEvent(null);
    }
    };

    useEffect(() => {
        getEvent(id, token, setEvent);
    }, [id, token]);

    if (!event) {
        return <div className="p-[20px] text-center">Event not found.</div>;
    }

    const assigned = volunteers.filter(v => v.assigned);
    const unassigned = volunteers.filter(v => !v.assigned);

    const handleAssign = async (vid) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/event/${id}/assign`,
                { event_id: Number(id), volunteer_id: vid },
                { headers: { Authorization: token } }
            );
            setVolunteers(volunteers.map(v =>
                v.id === vid ? { ...v, assigned: true } : v
            ));
            alert("Volunteer assigned!");
        } catch (err) {
            alert("Failed to assign volunteer.");
        }
    };

    const handleDrop = async (vid) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/event/${id}/drop`,
                { event_id: Number(id), volunteer_id: vid },
                { headers: { Authorization: token } }
            );
            setVolunteers(volunteers.map(v =>
                v.id === vid ? { ...v, assigned: false } : v
            ));
            alert("Volunteer dropped!");
        } catch (err) {
            alert("Failed to drop volunteer.");
        }
    };

    return (
        <div className="p-[20px] max-w-3xl mx-auto">
            <h1 className="font-bold text-2xl text-center mb-6">Event Assign</h1>

            <div className="border border-gray-300 rounded-md p-4 mb-6 shadow-sm bg-white">
                <h2 className="font-bold text-lg mb-4 border-b pb-2">Event Details</h2>
                <ul className="space-y-2 text-base">
                    <li><strong>Name:</strong> {event.name}</li>
                    <li><strong>Location:</strong> {event.location}</li>
                    <li><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</li>
                    <li><strong>Urgency:</strong> {["Low", "Medium", "High"][event.urgency] ?? event.urgency}</li>
                    <li><strong>Required Skills:</strong> {event.skill ? event.skill.join(", ") : ""}</li>
                    <li><strong>Description:</strong> {event.description}</li>
                </ul>
            </div>
            <div className="mb-8">
                <h2 className="font-bold text-lg mb-2">Assigned Volunteers</h2>
                <table className="min-w-full border border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Skill</th>
                            <th className="px-4 py-2 border">Preferences</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assigned.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-2">No volunteers assigned.</td>
                            </tr>
                        ) : (
                            assigned.map(v => (
                                <tr key={v.id}>
                                    <td className="px-4 py-2 border">{v.name}</td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex flex-wrap gap-2">
                                            {v.skills.map((skill) =>
                                                <div
                                                    key={skill}
                                                    className="items-center bg-blue-100 text-blue-700 px-3 py-1 rounded"
                                                >
                                                    <span>{skill}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border">{v.preferences}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDrop(v.id)}
                                        >
                                            Drop
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="font-bold text-lg mb-2">Add Volunteers</h2>
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Skill</th>
                            <th className="px-4 py-2 border">Preferences</th>
                            <th className="px-4 py-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unassigned.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-2">All volunteers assigned.</td>
                            </tr>
                        ) : (
                            unassigned.map(v => (
                                <tr key={v.id}>
                                    <td className="px-4 py-2 border">{v.name}</td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex flex-wrap gap-2">
                                            {v.skills.map((skill) =>
                                                <div
                                                    key={skill}
                                                    className="items-center bg-blue-100 text-blue-700 px-3 py-1 rounded"
                                                >
                                                    <span>{skill}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border">{v.preferences}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            onClick={() => handleAssign(v.id)}
                                        >
                                            Add
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EventAssign;