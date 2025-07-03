import { Route } from "react-router-dom";
import Homepage from "../page/Homepage";
import VolunteerLogin from "../page/volunteer/VolunteerLogin";
import VolunteerRegister from "../page/volunteer/VolunteerRegister";
import VolunteerProfile from "../page/volunteer/VolunteerProfile";
import Notification from "../page/volunteer/Notification";
import History from "../page/volunteer/History";
import AdminLogin from "../page/admin/AdminLogin";
import AdminRegister from "../page/admin/AdminRegister";
import AdminProfile from "../page/admin/AdminProfile";
import EventList from "../page/admin/EventList";
import EventCreate from "../page/admin/EventCreate";
import EventEdit from "../page/admin/EventEdit";
import EventAssign from "../page/admin/EventAssign";

const MyRoute = () => (
    <>
        <Route path="/" element={<Homepage/>}></Route>
        {/* volunteer */}
        <Route path="/volunteer/login" element={<VolunteerLogin/>}></Route>
        <Route path="/volunteer/register" element={<VolunteerRegister/>}></Route>
        <Route path="/volunteer/profile" element={<VolunteerProfile/>}></Route>
        <Route path="/volunteer/notification" element={<Notification/>}></Route>
        <Route path="/volunteer/history" element={<History/>}></Route>
        {/* admin */}
        <Route path="/admin/login" element={<AdminLogin/>}></Route>
        <Route path="/admin/register" element={<AdminRegister/>}></Route>
        <Route path="/admin/profile" element={<AdminProfile/>}></Route>
        <Route path="/admin/event" element={<EventList/>}></Route>
        <Route path="/admin/event/create" element={<EventCreate/>}></Route>
        <Route path="/admin/event/edit/:id" element={<EventEdit/>}></Route>
        <Route path="/admin/event/assign/:id" element={<EventAssign/>}></Route>
    </>
);

export default MyRoute;
