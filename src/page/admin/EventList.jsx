import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function EventList() {
    const token = localStorage.getItem("token");
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        try {
            let res = await axios.get(
                `${import.meta.env.VITE_API_URL}/event`,
                { headers: { Authorization: token } },
            );
            let data = res.data.data;
            setEvents(data);
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className="p-[20px]">
            <h1 className="font-bold text-2xl text-center mb-6">Event Management</h1>

            <div className="text-center mb-6">
                <a
                    href="/admin/event/create"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create New Event
                </a>
            </div>

            <div className="overflow-x-auto">
                <table className="text-xg min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-6 py-2 text-left">Name</th>
                            <th className="border px-6 py-2 text-left">Location</th>
                            <th className="border px-6 py-2 text-left">Date</th>
                            <th className="border px-6 py-2 text-left w-[150px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td className="border px-6 py-2">{event.name}</td>
                                <td className="border px-6 py-2">{event.location}</td>
                                <td className="border px-6 py-2">
                                    {event.date ? new Date(event.date).toLocaleDateString() : ""}
                                </td>
                                <td className="border px-6 py-2 space-x-2">
                                    <a
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        href={`/admin/event/edit/${event.id}`}
                                    >
                                        Edit
                                    </a>
                                    <a
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        href={`/admin/event/assign/${event.id}`}
                                    >
                                        Assign
                                    </a>
                                    <a
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default EventList;