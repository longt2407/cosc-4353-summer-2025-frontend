import React, { useState, useEffect } from 'react';

const historyTypeEnum = {
    VOLUNTEER: 'volunteer',
    ADMIN: 'admin',
    EVENT_STATUS: 'event status',
    EVENT_SIGNUP: 'event signup',
    EVENT_CANCEL: 'event canceled',
    EVENT_CREATE: 'event created',
    EVENT_UPDATE: 'event updated',
    EVENT_DELETE: 'event deleted',
    VOLUNTEER_SIGNUP: 'volunteer signup',
    VOLUNTEER_CANCEL: 'volunteer canceled',
    VOLUNTEER_UPDATE: 'volunteer updated',
    VOLUNTEER_DELETE: 'volunteer deleted',
};

//History that will be displayed
function HistoryItem({item, onDelete}){
    return(
        <div className="border p-4 mb-3 rounded shadow-sm bg-white flex justify-between items-center">
            <div>
                <p className="font-medium">
                    <span className="text-sm uppercase mr-2">[{historyTypeEnum[item.type] || 'GENERAL'}]</span>
                    <span className="text-base">{item.eventLoc} - {item.title}</span>
                </p>

                <small className="block text-sm text-gray-500">{new Date(item.timestamp).toLocaleString()}</small>
            </div>

            <div>
                <button onClick={() => onDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
        </div>
    );
}

function History() {
    const [historyList, setHistoryList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [filters, setFilters] = useState({ type: 'ALL', eventLoc: '', time: 'DESC' });

    useEffect(() => {
        const now = Date.now();
        /*Hardcoded data for now*/
        const rawHistory = [
            {
                id: 1,
                type: 'EVENT_SIGNUP',
                title: 'Volunteer Event A',
                eventLoc: 'Houston',
                timestamp: now - 10 * 60 * 1000,
            },
            {
                id: 2,
                type: 'EVENT_CANCEL',
                title: 'Volunteer Event B',
                eventLoc: 'Dallas',
                timestamp: now - 20 * 60 * 1000,
            },
            {
                id: 3,
                type: 'HOURS_LOGGED',
                title: 'Volunteer Event C',
                eventLoc: 'Austin',
                timestamp: now - 30 * 60 * 1000,
            },
            {
                id: 4,
                type: 'VOLUNTEER_SIGNUP',
                title: 'Volunteer Event C',
                eventLoc: 'Austin',
                timestamp: now - 60 * 60 * 1000,
            },
        ];
        setHistoryList(rawHistory);
    }, []);

    useEffect(() => {
        let filtered = [...historyList];

        if (filters.type !== 'ALL') {
            filtered = filtered.filter((item) => item.type === filters.type);
        }

        if (filters.eventLoc.trim() !== '') {
            filtered = filtered.filter((item) =>
                item.eventLoc.toLowerCase().includes(filters.eventLoc.toLowerCase())
            );
        }

        if (filters.time === 'ASC') {
            //oldest first
            filtered.sort((a, b) => a.timestamp - b.timestamp);
        } else {
            //newest first
            filtered.sort((a, b) => b.timestamp - a.timestamp);
        }

        setFilteredList(filtered);
    }, [filters, historyList]);

    const handleDelete = (id) => {
        const updated = historyList.filter((item) => item.id !== id);
        setHistoryList(updated);
    };

    return (
        <div className="p-[20px]">
            <h1 className="font-bold text-2xl text-center mb-6">History</h1>
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6">
                <select
                    className="border rounded p-2"
                    value={filters.type}
                    onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
                >
                    <option value="ALL">All</option>
                    <option value="EVENT_SIGNUP">Signed Up</option>
                    <option value="EVENT_CANCEL">Canceled</option>
                    <option value="HOURS_LOGGED">Hours Logged</option>
                </select>

                <input
                    type="text"
                    placeholder="Search Event Location"
                    className="border rounded p-2 flex-1"
                    value={filters.eventLoc}
                    onChange={(e) => setFilters((f) => ({ ...f, eventLoc: e.target.value }))}
                />

                <select
                    className="border rounded p-2"
                    value={filters.time}
                    onChange={(e) => setFilters((f) => ({ ...f, time: e.target.value }))}
                >
                    <option value="DESC">Newest First</option>
                    <option value="ASC">Oldest First</option>
                </select>
            </div>

            {filteredList.length === 0 ? (<p className="text-center text-gray-500">No history found.</p>) :
                (filteredList.map((item) => (<HistoryItem key={item.id} item={item} onDelete={handleDelete} />)))}
        </div>
    );
}

export default History;
