import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VolunteerProfile() {
    const navigate = useNavigate();
    const tzOffset = (new Date()).getTimezoneOffset() * 60 * 1000; // input type date is interpreted as a UTC time
    const token = localStorage.getItem("token");
    const [profile, setProfile] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        address_city: "",
        address_state: "",
        address_zip: "",
        skill: [],
        preference: "",
        availability: []
    });
    const [newSkill, setNewSkill] = useState("");
    const [newAvailability, setNewAvailability] = useState((new Date()).getTime());

    const addAvailability = () =>{
        let d1 = new Date(newAvailability + tzOffset);
        let duplicate = profile.availability.find((date) => {
            let d2 = new Date(date);
            return d1.getFullYear() === d2.getFullYear()
                && d1.getMonth() === d2.getMonth()
                && d1.getDate() === d2.getDate();
        });
        if (!duplicate) {
            setProfile((prev) => ({
                ...prev,
                availability: [...profile.availability, newAvailability + tzOffset],
            }));
        }
    };

    const removeAvailability = (date) => {
        setProfile((prev) => ({
            ...prev,
            availability: profile.availability.filter((d) => d !== date),
        }));
    };

    const addSkill = () =>{
        const val = newSkill;
        const isValid = /^[A-Za-z]+$/.test(val);

        if (val && isValid && !profile.skill.includes(val)) {
            setProfile((prev) => ({
                ...prev,
                skill: [...profile.skill, val],
            }));
            setNewSkill("");
        }
    };

    const removeSkill = (skill) =>{
        setProfile((prev) => ({
            ...prev,
            skill: profile.skill.filter((s) => s !== skill),
        }));
    };

    const getProfile = async () => {
        try {
            let res = await axios.get(
                `${import.meta.env.VITE_API_URL}/volunteer/profile`,
                { headers: { Authorization: token } },
            );
            let data = res.data.data;
            setProfile({
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
                address_1: data.address_1,
                address_2: data.address_2,
                address_city: data.address_city,
                address_state: data.address_state,
                address_zip: data.address_zip,
                skill: data.skill,
                preference: data.preference,
                availability: data.availability
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
        try {
            e.preventDefault();
            if (profile.availability.length < 1) {
                throw new Error("Please enter at least one availability date!")
            }
            if (profile.skill.length < 1) {
                throw new Error("Please add at least one skill!")
            }
            let res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/volunteer/profile`,
                {
                    first_name: profile.first_name,
                    middle_name: profile.middle_name && profile.middle_name.length !== 0 ? profile.middle_name : null,
                    last_name: profile.last_name,
                    address_1: profile.address_1,
                    address_2: profile.address_2 && profile.address_2.length !== 0 ? profile.address_2 : null,
                    address_city: profile.address_city,
                    address_state: profile.address_state,
                    address_zip: profile.address_zip,
                    skill: profile.skill,
                    preference: profile.preference && profile.preference.length !== 0 ? profile.preference : null,
                    availability: profile.availability
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
                        <span>Volunteer Profile</span>
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
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <div className="text-gray-700 mb-1">
                                <span>Address 1</span>
                            </div>
                            <input
                                name="address_1"
                                value={profile.address_1}
                                onChange={handleChange}
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="text-gray-700 mb-1">
                                <span>Address 2</span>
                            </div>
                            <input
                                name="address_2"
                                value={profile.address_2}
                                onChange={handleChange}
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                            <div className="text-gray-700 mb-1">
                                <span>City</span>
                            </div>
                            <input
                                name="address_city"
                                value={profile.address_city}
                                onChange={handleChange}
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="text-gray-700 mb-1">
                                <span>State</span>
                            </div>
                            <select
                                name="address_state"
                                value={profile.address_state}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option disabled selected value="">Select</option>
                                <option value="AL">Alabama (AL)</option>
                                <option value="AK">Alaska (AK)</option>
                                <option value="AZ">Arizona (AZ)</option>
                                <option value="AR">Arkansas (AR)</option>
                                <option value="CA">California (CA)</option>
                                <option value="CO">Colorado (CO)</option>
                                <option value="CT">Connecticut (CT)</option>
                                <option value="DE">Delaware (DE)</option>
                                <option value="DC">District Of Columbia (DC)</option>
                                <option value="FL">Florida (FL)</option>
                                <option value="GA">Georgia (GA)</option>
                                <option value="HI">Hawaii (HI)</option>
                                <option value="ID">Idaho (ID)</option>
                                <option value="IL">Illinois (IL)</option>
                                <option value="IN">Indiana (IN)</option>
                                <option value="IA">Iowa (IA)</option>
                                <option value="KS">Kansas (KS)</option>
                                <option value="KY">Kentucky (KY)</option>
                                <option value="LA">Louisiana (LA)</option>
                                <option value="ME">Maine (ME)</option>
                                <option value="MD">Maryland (MD)</option>
                                <option value="MA">Massachusetts (MA)</option>
                                <option value="MI">Michigan (MI)</option>
                                <option value="MN">Minnesota (MN)</option>
                                <option value="MS">Mississippi (MS)</option>
                                <option value="MO">Missouri (MO)</option>
                                <option value="MT">Montana (MT)</option>
                                <option value="NE">Nebraska (NE)</option>
                                <option value="NV">Nevada (NV)</option>
                                <option value="NH">New Hampshire (NH)</option>
                                <option value="NJ">New Jersey (NJ)</option>
                                <option value="NM">New Mexico (NM)</option>
                                <option value="NY">New York (NY)</option>
                                <option value="NC">North Carolina (NC)</option>
                                <option value="ND">North Dakota (ND)</option>
                                <option value="OH">Ohio (OH)</option>
                                <option value="OK">Oklahoma (OK)</option>
                                <option value="OR">Oregon (OR)</option>
                                <option value="PA">Pennsylvania (PA)</option>
                                <option value="RI">Rhode Island (RI)</option>
                                <option value="SC">South Carolina (SC)</option>
                                <option value="SD">South Dakota (SD)</option>
                                <option value="TN">Tennessee (TN)</option>
                                <option value="TX">Texas (TX)</option>
                                <option value="UT">Utah (UT)</option>
                                <option value="VT">Vermont (VT)</option>
                                <option value="VA">Virginia (VA)</option>
                                <option value="WA">Washington (WA)</option>
                                <option value="WV">West Virginia (WV)</option>
                                <option value="WI">Wisconsin (WI)</option>
                                <option value="WY">Wyoming (WY)</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <div className="text-gray-700 mb-1">
                                <span>Zip code</span>
                            </div>
                            <input
                                name="address_zip"
                                value={profile.address_zip}
                                onChange={handleChange}
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="text-gray-700 mb-1">
                            <span>Availability</span>
                        </div>
                        <div className="flex flex-wrap gap-2 gap-x-2">
                                {profile.availability.map((date) => (
                                    <div
                                        key={date}
                                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded"
                                    >
                                        <span>{(new Date(date)).toLocaleDateString('en-US').substring(0, 10)}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeAvailability(date)}
                                            className="ml-2 text-blue-700 hover:text-blue-900 font-bold"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                <div className="flex">
                                    <input
                                        value={(new Date(newAvailability)).toISOString().substring(0, 10)}
                                        onChange={(e) => setNewAvailability(e.target.valueAsNumber)}
                                        type="date"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={addAvailability}
                                        className="ml-2 bg-green-500 text-white px-4 rounded hover:bg-green-600"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                    </div>
                    <div>
                        <div>
                            <div className="text-gray-700 mb-1">
                                <span>Skills</span>
                            </div>
                            <div className="flex flex-wrap gap-2 gap-x-2">
                                {profile.skill.map((skill) => (
                                    <div
                                        key={skill}
                                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded"
                                    >
                                        <span>{skill}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            className="ml-2 text-blue-700 hover:text-blue-900 font-bold"
                                            aria-label={`Remove skill ${skill}`}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value.replace(/[^A-Za-z]/g, ""))}
                                        placeholder="Comminication"
                                        className="w-[160px] flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={addSkill}
                                        className="ml-2 bg-green-500 text-white px-4 rounded hover:bg-green-600"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label className="block text-gray-700 mb-1">Preferences</label>
                            <textarea
                                name="preference"
                                value={profile.preference}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <button
                                onClick={() => { navigate("/volunteer/change-password") }}
                                type="button"
                                className="bg-yellow-500 text-white py-2 px-2 rounded hover:bg-yellow-600"
                            >
                                Change password
                            </button>
                            <button
                                onClick={() => { navigate("/volunteer/change-security-question") }}
                                type="button"
                                className="bg-yellow-500 text-white py-2 px-2 mx-2 rounded hover:bg-yellow-600"
                            >
                                Change security question
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer position="bottom-right"/>
        </div>
    );
}

export default VolunteerProfile;