import React, { useState, useEffect } from 'react';

const notifTypeEnum = {
    EVENT_UPDATE: 'EVENT UPDATE',
    NEW_EVENT: 'NEW EVENT',
    REMINDER: 'REMINDER',
    EVENT_DELETE: 'EVENT CANCELED',
    VOLUNTEER_DELETE: 'VOLUNTEER CANCELED',
    VOLUNTEER_UPDATE: 'VOLUNTEER UPDATE',
    VOLUNTEER_CREATE: 'VOLUNTEER ADDED',
};

//Parsing function for message string (Pulled info from DB later on or something similar)
function NotifMessageStruc(message) {
    //Pulling type
    const [type, messageStr] = message.split(':');
    const typeStr = notifTypeEnum[type.trim()] || 'GENERAL';

    //Pulling Event location && Date
    const [eventLoc, eventDate] = messageStr?.trim().split(' - ') ?? [];
    const eventLocStr = eventLoc?.trim() || 'TBD';
    let action = '';
    let date = '';

    if(eventDate){
        const dateMatch = eventDate.match(/(.+?)\s+to\s+(.+)/i);
        if(dateMatch){
            action = dateMatch[1].trim();
            date = dateMatch[2].trim();
        }else{
            action = eventDate.trim();
        }
    }

    return {typeStr, eventLocStr, action, date};
}

//Notification that will be displayed
function NotificationItem({ notification, markAsRead, onDelete }) {
    return (
        <div className="border p-4 mb-3 rounded shadow-sm bg-white">
            <p className={notification.read ? 'text-gray-700' : 'font-bold'}>
                <span className="text-sm uppercase mr-2">[{notifTypeEnum[notification.type] || 'General'}]</span>
                <span className="text-base">{notification.eventLoc}: {notification.action}
                {notification.date && (<> - <span className="text-base">{notification.date}</span></>)}</span>
            </p>

            <small className="block text-sm text-gray-500">{new Date(notification.timestamp).toLocaleString()}</small>

            <div className="mt-2 space-x-2">
                {!notification.read && (<button onClick={() => markAsRead(notification.id)} className="text-blue-600 hover:underline">Mark as Read</button>)}
                <button onClick={() => onDelete(notification.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
        </div>
    );
}

//Components of the Notification
function Notification() {
    const [notifications, setNotif] = useState([]);
    //filter for all, read, and unread will be added

    useEffect(() => {
        const rawNotif = [
            {
                id: 1,
                type: 'EVENT_UPDATE',
                eventLoc: 'Houston Fundraiser',
                action: 'Date changed',
                date: '10/10/2021',
                timestamp: Date.now() - 60000,
                read: false,
            },
            {
                id: 2,
                type: 'NEW_EVENT',
                eventLoc: 'Dallas Marathon',
                action: 'Announced',
                date: '10/12/2021',
                timestamp: Date.now() - 120000,
                read: true,
            },
            {
                id: 3,
                type: 'REMINDER',
                eventLoc: 'Volunteer Meeting',
                action: 'Starts at',
                date: '07/05/2025 3:00 PM',
                timestamp: Date.now() - 300000,
                read: false,
            },
            {
                id: 4,
                type: 'VOLUNTEER_CREATE',
                eventLoc: 'Houston Zoo',
                action: 'Starts at',
                date: '07/05/2025 3:00 PM',
                timestamp: Date.now() - 300000,
                read: false,
            },
        ];

        /* Will needed to be used once having access to db
        const parsedNotif = rawNotif.map((n) => {
            const result = NotifMessageStruc(n.message);
            return {...n, ...result};
        });*/

        setNotif(rawNotif);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAsRead = (id) => {
        setNotif((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const handleDelete = (id) => {
        setNotif((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <div className="p-[20px] max-w-xl mx-auto">
            <h1 className="font-bold text-2xl text-center mb-6">Notifications</h1>
            {notifications.length === 0 ? (<p className="text-center text-gray-500">No new notifications.</p>) : (notifications
                .sort((a, b) => b.timestamp - a.timestamp)
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
