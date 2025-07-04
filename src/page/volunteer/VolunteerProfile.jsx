import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";

function VolunteerProfile() {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [availability, setAvailability] = useState([]);
    const [newAvailability, setNewAvailability] = useState((new Date()).getTime());
    const tzOffset = (new Date()).getTimezoneOffset() * 60 * 1000; // input type date is interpreted as a UTC time

    const addAvailability = () =>{
        if (!availability.includes(newAvailability + tzOffset)) {
            setAvailability([...availability, newAvailability + tzOffset]);
        }
    };

    const removeAvailability = (date) => {
        setAvailability(availability.filter((d) => d !== date));
    };

    const addSkill = () =>{
        const val = newSkill;
        const isValid = /^[A-Za-z]+$/.test(val);

        if (val && isValid && !skills.includes(val)) {
            setSkills([...skills, val]);
            setNewSkill("");
        }
    };

    const removeSkill = (skill) =>{
        setSkills(skills.filter((s) => s !== skill));
    };

    const submit = (e) => {
        try {
            e.preventDefault();
            if (availability.length < 1) {
                throw new Error("Please enter at least one availability date!")
            }
            if (skills.length < 1) {
                throw new Error("Please add at least one skill!")
            }
            toast.success("Changes have been saved successfully!");
        } catch(err) {
            toast.error(err.message);
        }
    }

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
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <div className="text-gray-700 mb-1">
                                <span>Address 1</span>
                            </div>
                            <input
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
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
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
                                {availability.map((date) => (
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
                                {skills.map((skill) => (
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
                                        onChange={(e) =>
                                            setNewSkill(e.target.value.replace(/[^A-Za-z]/g, ""))
                                        }
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
                                rows={2}
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

export default VolunteerProfile;