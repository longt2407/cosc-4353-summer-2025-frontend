import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Router from "./route/Router";
import NotFound from "./page/NotFound";

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex-grow flex justify-center bg-gray-300">
                <div className="relative container">
                    <Routes>
                        {Router()}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
