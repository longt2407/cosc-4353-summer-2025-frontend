import { ToastContainer, toast } from 'react-toastify';

function AdminProfile() {
    const submit = (e) => {
        e.preventDefault();
        toast.success("Changes have been saved successfully!");
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <div className="mb-6 ">
                    <div className="text-2xl font-bold text-center">
                        <span>Admin Profile</span>
                    </div>
                </div>
                <form
                    className="space-y-4"
                    onSubmit={submit}
                >
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <div className="text-gray-700 mb-1">
                                <span>First Name</span>
                            </div>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="text-gray-700 mb-1">
                                <span>Middle Name</span>
                            </div>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="text-gray-700 mb-1">
                                <span>Last Name</span>
                            </div>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-yellow-500 text-white py-2 px-2 rounded hover:bg-yellow-600"
                        >
                            Change password
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default AdminProfile;