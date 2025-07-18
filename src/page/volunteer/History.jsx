import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import API from '../../utils/apiCall.jsx';

//History that will be displayed
function HistoryItem({item, onDelete}){
    return(
        <div className="border p-4 mb-3 rounded shadow-sm bg-white flex justify-between items-center">
            <div>
                <p className="font-medium">
                    <span className="text-sm uppercase mr-2">[{item.type || 'GENERAL'}]</span>
                    <span className="text-base">{item.event_name}</span>
                </p>

                <small className="block text-sm text-gray-500">{new Date(item.date).toLocaleString()}</small>
            </div>
        </div>
    );
}

function History() {
    const volunteerId = 1;
    const [historyList, setHistoryList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [filters, setFilters] = useState({ type: 'ALL', eventLoc: '', time: 'DESC' });

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await API.get(`/volunteer/history/${volunteerId}`);
                console.log('API response:', response.data);
                const data = response.data?.data?.events || [];

                setHistoryList(data);
            }catch(err){
                console.log("Failed to fetch history: ", err.response?.data || err.message);
            }
        };
        fetchHistory();
    }, [volunteerId]);

    useEffect(() => {
        let filtered = [...historyList];

        if (filters.type !== 'ALL') {
            filtered = filtered.filter((item) => item.type === filters.type);
        }

        filtered.sort((a, b) => {
            const aDate = new Date(a.date).getTime();
            const bDate = new Date(b.date).getTime();
            return filters.time === 'ASC' ? aDate - bDate : bDate - aDate;
        });
        setFilteredList(filtered);
    }, [filters, historyList]);

    const handleDelete = (id) => {
        setHistoryList((prev) => prev.filter((item) => item.id !== id));
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
