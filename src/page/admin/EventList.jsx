function EventList(){
    return (
        <div className="p-[20px]">
            <h1 className="font-bold text-2xl text-center mb-6">EventList</h1>

            <div className="text-center">
                <a
                    href="/admin/event/create"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create New Event
                </a>
            </div>
        </div>
    );
}

export default EventList;