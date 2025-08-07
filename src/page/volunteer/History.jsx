import React, { useState, useEffect } from 'react';
import API from '../../utils/apiCall.jsx';

const statusMap = {
  0: 'ASSIGNED',
  1: 'PARTICIPATED',
  2: 'NO_SHOW',
};

const filterMap = {
  ALL: null,
  ASSIGNED: 0,
  PARTICIPATED: 1,
  NO_SHOW: 2,
};

//History that will be displayed
function HistoryItem({item, onClick}){
    return(
        <div className="border p-4 mb-3 rounded shadow-sm bg-white cursor-pointer hover:bg-gray-100" onClick={() => onClick(item)}>
            <div>
                <p className="font-medium">
                    <span className="text-sm uppercase mr-2">[{statusMap[item.type] || 'GENERAL'}]</span>
                    <span className="text-base">{item.event_name}</span>
                </p>

                <small className="block text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</small>
            </div>
        </div>
    );
}

function History() {
	const user =  JSON.parse(localStorage.getItem("user")) || {};
    const volunteerId = user.id;
    const [historyList, setHistoryList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [filters, setFilters] = useState({ type: 'ALL', eventLoc: '', time: 'DESC' });
    const [selectedItem, setSelectedItem] = useState(null);

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
            filtered = filtered.filter((item) => item.type === filterMap[filters.type]);
        }

        if (filters.eventLoc) {
            filtered = filtered.filter((item) => item.location?.toLowerCase().includes(filters.eventLoc.toLowerCase()));
        }

        filtered.sort((a, b) => {
            const aDate = new Date(a.date).getTime();
            const bDate = new Date(b.date).getTime();
            return filters.time === 'ASC' ? aDate - bDate : bDate - aDate;
        });
        setFilteredList(filtered);
    }, [filters, historyList]);

    const closePopup = () => setSelectedItem(null);

    const handleDelete = (id) => {
        setHistoryList((prev) => prev.filter((item) => item.id !== id));
    };

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <div className="p-[20px] relative">
            <h1 className="font-bold text-2xl text-center mb-6">History</h1>
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-6">
                <select
                    className="border rounded p-2"
                    value={filters.type}
                    onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
                >
                    <option value="ALL">All</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="PARTICIPATED">Participated</option>
                    <option value="NO_SHOW">No Show</option>
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
                (filteredList.map((item) => (<HistoryItem key={item.id} item={item} onClick={setSelectedItem} />)))}

            {selectedItem && (
                <div className="fixed top-20 right-10 z-50 w-96 bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                    <button className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl" onClick={closePopup} aria-label="Close details">&times;</button>
                    <h3 className="text-xl font-semibold mb-2">{selectedItem.event_name}</h3>
                    <p><strong>Status:</strong> {statusMap[selectedItem.type]}</p>
                    <p><strong>Location:</strong> {selectedItem.location}</p>
                    <p><strong>Date:</strong> {new Date(selectedItem.date).toLocaleDateString()}</p>
                    <p><strong>Admin Name:</strong> {[selectedItem.admin_first_name, selectedItem.admin_middle_name, selectedItem.admin_last_name].join(" ")}</p>
                    <p><strong>Admin Email:</strong> {selectedItem.admin_email || 'N/A'}</p>
                    <p><strong>Description:</strong> {selectedItem.description || 'N/A'}</p>
                </div>
          )}
        </div>
    );
}

export default History;
