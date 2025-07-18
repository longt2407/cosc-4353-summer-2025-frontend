import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import axios from "axios";

function AdminProfile() {
    const token = localStorage.getItem("token");
    const [profile, setProfile] = useState({
        first_name: "",
        middle_name: "",
        last_name: ""
    });

    const getProfile = async () => {
        try {
            let res = await axios.get(
                `${import.meta.env.VITE_API_URL}/admin/profile`,
                { headers: { Authorization: token } },
            );
            let data = res.data.data;
            setProfile({
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
            });
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            e.preventDefault();
            let res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/admin/profile`,
                {
                    first_name: profile.first_name,
                    middle_name: profile.middle_name,
                    last_name: profile.last_name
                },
                { headers: { Authorization: token } },
            );
            let data = res.data.data;
            localStorage.setItem("user", JSON.stringify(data));
            toast.success("Changes have been saved successfully!");
        } catch(err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

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
                                name="first_name"
                                value={profile.first_name}
                                onChange={handleChange}
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
                                name="middle_name"
                                value={profile.middle_name}
                                onChange={handleChange}
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="text-gray-700 mb-1">
                                <span>Last Name</span>
                            </div>
                            <input
                                name="last_name"
                                value={profile.last_name}
                                onChange={handleChange}
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