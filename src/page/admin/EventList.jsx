function EventList() {
    const events = [
        {
            id: 1,
            name: 'Tech Conference 2025',
            location: 'San Francisco, CA',
            urgency: 'High',
            date: '2025-08-12',
            skills: 'comminication',
            desciption: 'Introduce new technologies'
        },
        {
            id: 2,
            name: 'Art Expo 2025',
            location: 'New York, NY',
            urgency: 'Low',
            date: '2025-09-05',
            skills: 'comminication',
            desciption: 'introduce new art'
        },
    ];

    return (
        <div className="p-[20px]">
            <h1 className="font-bold text-2xl text-center mb-6">Event List</h1>

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
                                <td className="border px-6 py-2">{event.date}</td>
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
        </div>
    );
}

export default EventList;