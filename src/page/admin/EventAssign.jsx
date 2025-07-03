import { useParams } from "react-router-dom";
import { useState } from "react";

const events =[
    {
        id: 1,
        name: 'Tech Conference 2025',
        location: 'San Francisco, CA',
        urgency: 'High',
        date: '2025-08-12',
        skills: ['communication'],
        description: 'Introduce new technologies'
    },
    {
        id: 2,
        name: 'Art Expo 2025',
        location: 'New York, NY',
        urgency: 'Low',
        date: '2025-09-05',
        skills: ['communication'],
        description: 'introduce new art'
    },
];

const allVolunteers =[
    { id: 1, name: "Alice", assigned: true, skill: "communication", preferences: "Alex" },
    { id: 2, name: "Bob", assigned: false, skill: "organization", preferences: "Alex" },
    { id: 3, name: "Charlie", assigned: false, skill: "management", preferences: "Alex" },
];

function EventAssign(){
    const { id } = useParams();
    const event = events.find(e => e.id === Number(id));
    const [volunteers, setVolunteers] = useState(allVolunteers);

    if (!event) {
        return <div className="p-[20px] text-center">Event not found.</div>;
    }

    const assigned = volunteers.filter(v => v.assigned);
    const unassigned = volunteers.filter(v => !v.assigned);

    const handleAssign = (vid) =>{
        setVolunteers(volunteers.map(v =>
            v.id === vid ? { ...v, assigned: true } : v
        ));
    };

    const handleRemove = (vid) =>{
        setVolunteers(volunteers.map(v =>
            v.id === vid ? { ...v, assigned: false } : v
        ));
    };

    return(
        <div className="p-[20px] max-w-3xl mx-auto">
            <h1 className="font-bold text-2xl text-center mb-6">Event Assign</h1>
            
            <div className="border border-gray-300 rounded-md p-4 mb-6 shadow-sm bg-white">
                <h2 className="font-bold text-lg mb-4 border-b pb-2">Event Details</h2>
                <ul className="space-y-2 text-base">
                    <li><strong>Name:</strong> {event.name}</li>
                    <li><strong>Location:</strong> {event.location}</li>
                    <li><strong>Date:</strong> {event.date}</li>
                    <li><strong>Urgency:</strong> {event.urgency}</li>
                    <li><strong>Required Skills:</strong> {event.skills.join(", ")}</li>
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
                                    <td className="px-4 py-2 border">{v.skill}</td>
                                    <td className="px-4 py-2 border">{v.preferences}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleRemove(v.id)}
                                        >
                                            Remove
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
                                    <td className="px-4 py-2 border">{v.skill}</td>
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