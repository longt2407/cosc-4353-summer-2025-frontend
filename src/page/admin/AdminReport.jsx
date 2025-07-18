import React, { useState, useEffect } from 'react';
import API from '../../utils/apiCall.jsx';

function AdminVolunteerReport() {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [sortKey, setSortKey] = useState('volunteer_id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);

useEffect(() => {
    const fetchReports = async () => {
        setLoading(true);
        try {
            const res = await API.get('/volunteer/report/');
            setVolunteers(res.data?.data || []);
        } catch (error) {
            console.error("Failed to fetch volunteer reports", error);
        } finally {
            setLoading(false);
        }
    };
    fetchReports();
}, []);

  // Filter & sort logic
useEffect(() => {
    let filtered = volunteers;

    if (searchKey.trim()) {
        const lower = searchKey.toLowerCase();
        filtered = filtered.filter(v => (`${v.volunteer_first_name} ${v.volunteer_middle_name} ${v.volunteer_last_name}`.toLowerCase().includes(lower)));
    }

    filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        }

        return 0;
    });

    setFilteredVolunteers(filtered);
}, [searchKey, volunteers, sortKey, sortOrder]);

const toggleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
};

    return (
        <div className="p-6">
            <div className="flex justify-center mb-4">
                <h1 className="text-3xl font-bold">Volunteer Reports</h1>
            </div>

            <input type="text" placeholder="Search by volunteer name..." value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className="border p-2 rounded w-full max-w-md mb-6"/>

            {loading ? ( <p>Loading...</p>) : (<table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th onClick={() => toggleSort('volunteer_id')} className="cursor-pointer border p-2">ID {sortKey === 'volunteer_id' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</th>
                        <th onClick={() => toggleSort('volunteer_first_name')} className="cursor-pointer border p-2">First Name {sortKey === 'volunteer_first_name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</th>
                        <th className="border p-2">Middle Name</th>
                        <th onClick={() => toggleSort('volunteer_last_name')} className="cursor-pointer border p-2">Last Name {sortKey === 'volunteer_last_name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Note</th>
                        <th onClick={() => toggleSort('total_assigned_event')} className="cursor-pointer border p-2">Assigned {sortKey === 'total_assigned_event' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</th>
                        <th onClick={() => toggleSort('total_participated_event')} className="cursor-pointer border p-2">Participated {sortKey === 'total_participated_event' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</th>
                        <th onClick={() => toggleSort('total_no_show_event')} className="cursor-pointer border p-2">No Shows {sortKey === 'total_no_show_event' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredVolunteers.length === 0 ? (
                        <tr><td colSpan="9" className="text-center p-4">No volunteers found.</td></tr>) : (filteredVolunteers.map(v => (
                        <tr key={v.volunteer_id} className="hover:bg-gray-100">
                            <td className="border p-2 text-center">{v.volunteer_id}</td>
                            <td className="border p-2">{v.volunteer_first_name}</td>
                            <td className="border p-2">{v.volunteer_middle_name}</td>
                            <td className="border p-2">{v.volunteer_last_name}</td>
                            <td className="border p-2">{v.volunteer_email}</td>
                            <td className="border p-2">{v.note}</td>
                            <td className="border p-2 text-center">{v.total_assigned_event}</td>
                            <td className="border p-2 text-center">{v.total_participated_event}</td>
                            <td className="border p-2 text-center">{v.total_no_show_event}</td>
                        </tr>
                      ))
                    )}
                </tbody>
            </table>
          )}
        </div>
    );
}

export default AdminVolunteerReport;
