import React, { useState, useEffect } from 'react';
import API from '../../utils/apiCall';

//Parsing function for message string (Pulled info from DB later on or something similar)
function NotifMessageStruc(notification) {
    const typeStr = notification.title || 'GENERAL';
    const action = notification.message || '';
    const eventLocStr = '';
    const date = '';

    return { typeStr, eventLocStr, action, date };
}

//Notification that will be displayed
function NotificationItem({ notification, markAsRead, onDelete }) {
    const isRead = notification.status === 1;
    const textClass = isRead ? 'text-gray-700 font-normal' : 'font-bold';
    return (
        <div className="border p-4 mb-3 rounded shadow-sm bg-white">
            <p className={`text-sm uppercase mr-2 ${textClass}`}>
                <span className="text-sm uppercase mr-2">[{notification.title || 'GENERAL'}]:</span>
                <span className={textClass}>{notification.message}</span>
            </p>

            <small className="block text-sm text-gray-500"> {new Date(notification.created_at).toLocaleString()}</small>

            <div className="mt-2 space-x-2">
                {!isRead && (<button onClick={() => markAsRead(notification.id)} className="text-blue-600 hover:underline">Mark as Read</button>)}
                <button onClick={() => onDelete(notification.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
        </div>
    );
}

//Components of the Notification
function Notification() {
    const [notifications, setNotif] = useState([]);
	const user =  JSON.parse(localStorage.getItem("user")) || {};
    const volunteerId = user.id;

    //filter for all, read, and unread will be added

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await API.get(`/notification/${volunteerId}/notifications`);
                console.log("Notification API response:", response.data);
                const data = Array.isArray(response.data.data) ? response.data.data : [];

                setNotif(data);
            }catch(err){
                console.log("Failed to fetch notifications: ", err.response?.data || err.message);
                setNotif([]);
            }
        }

        fetchData();
    }, []);

    const handleMarkAsRead = async (id) => {
        try{
            const response = await API.put(`/notification/${volunteerId}/notifications/${id}`);
            console.log('Mark as Read response:', response.data);

            setNotif((prev) => prev.map((n) => (n.id === id ? { ...n, status: 1 } : n)));
        }catch(err){
            console.log("Failed to mark as read: ", err.response?.data || err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/notification/${volunteerId}/notifications/${id}`);
            setNotif((prev) => prev.filter((n) => n.id !== id));
        }catch(err){
            console.log("Failed to delete notification: ", err.response?.data || err.message);
        }
    };

    return (
        <div className="p-[20px] max-w-xl mx-auto">
            <h1 className="font-bold text-2xl text-center mb-6">Notifications</h1>
            {notifications.length === 0 ? (<p className="text-center text-gray-500">No new notifications.</p>) : (notifications
                .sort((a, b) =>  new Date(b.created_at) - new Date(a.created_at))
                .map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        markAsRead={handleMarkAsRead}
                        onDelete={handleDelete}
                    />
                ))
            )}
        </div>
    );
}

export default Notification;
