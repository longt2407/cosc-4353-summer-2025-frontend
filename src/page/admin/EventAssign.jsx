import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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

const getAssigned = async (id, token, setAssigned) => {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/volunteer/event/${id}/assigned`,
            { headers: { Authorization: token } }
        );
        setAssigned(res.data.data || []);
    } catch (err) {
        setAssigned([]);
    }
};

const getSuggested = async (id, token, setSuggested) => {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/volunteer/event/${id}/matched`,
            { headers: { Authorization: token } }
        );
        setSuggested(res.data.data || []);
    } catch (err) {
        setSuggested([]);
    }
};

const getAllVolunteers = async (token, setAllVolunteers) => {
    try {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/volunteer`,
            { headers: { Authorization: token } }
        );
        setAllVolunteers(res.data.data || []);
    } catch (err) {
        setAllVolunteers([]);
    }
};

function EventAssign() {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const [event, setEvent] = useState(null);
    const [assigned, setAssigned] = useState([]);
    const [suggested, setSuggested] = useState([]);
    const [allVolunteers, setAllVolunteers] = useState([]);

    useEffect(() => {
        getEvent(id, token, setEvent);
        getAssigned(id, token, setAssigned);
        getSuggested(id, token, setSuggested);
        getAllVolunteers(token, setAllVolunteers);
    }, [id, token]);

    // Filter assigned volunteers from suggested list and all list
    const assignedIds = new Set(assigned.map(v => v.id));
    const filteredSuggested = suggested.filter(v => !assignedIds.has(v.id));
    const filteredAll = allVolunteers.filter(v => !assignedIds.has(v.id));

    const refreshLists = async () => {
        await getAssigned(id, token, setAssigned);
        await getSuggested(id, token, setSuggested);
        await getAllVolunteers(token, setAllVolunteers);
    };

    const handleAssign = async (volunteerId) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/event/${id}/assign`,
                { event_id: Number(id), volunteer_id: volunteerId },
                { headers: { Authorization: token } }
            );
            await refreshLists();
            alert("Volunteer assigned successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to assign volunteer.");
        }
    };

    const handleDrop = async (volunteerId) => {
        try {
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/event/${id}/drop`,
                { event_id: Number(id), volunteer_id: volunteerId },
                { headers: { Authorization: token } }
            );
            await refreshLists();
            alert("Volunteer dropped successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to drop volunteer.");
        }
    };

    if (!event) {
        return <div className="p-[20px] text-center">Event not found.</div>;
    }

    return (
        <div className="p-[20px] max-w-4xl mx-auto">
            <h1 className="font-bold text-2xl text-center mb-6">Event Assign</h1>

                {/* Event Details */}
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

                {/* Assigned Volunteers */}
                <VolunteerTable
                    title="Assigned Volunteers"
                    volunteers={assigned}
                    actionLabel="Drop"
                    onAction={handleDrop}
                    emptyMessage="No volunteers assigned."
                    actionClass="bg-red-500 hover:bg-red-600"
                    showStatus={true}
                />

                {/* Suggested Volunteers */}
                <VolunteerTable
                    title="Suggested Volunteers"
                    volunteers={filteredSuggested}
                    actionLabel="Add"
                    onAction={handleAssign}
                    emptyMessage="No suggested volunteers."
                    actionClass="bg-blue-500 hover:bg-blue-600"
                />

                {/* All Volunteers */}
                <VolunteerTable
                    title="All Volunteers"
                    volunteers={filteredAll}
                    actionLabel="Add"
                    onAction={handleAssign}
                    emptyMessage="No volunteers found."
                    actionClass="bg-blue-500 hover:bg-blue-600"
                />
            </div>
    );
}

const statusLabels = {
    0: "Assigned",
    1: "Participated",
    2: "No Show",
};

function VolunteerTable({ title, volunteers, actionLabel, onAction, emptyMessage, actionClass, showStatus = false }) {
    return (
        <div className="mb-8">
            <h2 className="font-bold text-lg mb-2">{title}</h2>
            <table className="min-w-full border border-gray-300 mb-4">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Skill</th>
                        <th className="px-4 py-2 border">Preferences</th>
                        {showStatus && <th className="px-4 py-2 border">Status</th>}
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteers.length === 0 ? (
                        <tr>
                            <td colSpan={showStatus ? 5 : 4} className="text-center py-2">{emptyMessage}</td>
                        </tr>
                    ) : (
                        volunteers.map(v => (
                            <tr key={v.id}>
                                <td className="px-4 py-2 border">{v.first_name} {v.last_name}</td>
                                <td className="px-4 py-2 border">
                                    <div className="flex flex-wrap gap-2">
                                        {(v.skill || []).map(skill => (
                                            <span key={skill} className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-2 border">{v.preference}</td>
                                {showStatus && (
                                    <td className="px-4 py-2 border text-center">
                                        <span className="px-2 py-1 rounded bg-gray-100 text-gray-800">
                                            {statusLabels[v.status] ?? v.status}
                                        </span>
                                    </td>
                                )}
                                <td className="px-4 py-2 border text-center">
                                    <button
                                        className={`${actionClass} text-white px-3 py-1 rounded`}
                                        onClick={() => onAction(v.id)}
                                    >
                                        {actionLabel}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EventAssign;