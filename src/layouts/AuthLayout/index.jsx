import {Outlet} from 'react-router-dom'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "../../assets/styles/index.scss";

export default function AuthLayout() {

    return (
        <div>
            <div className="wrapper">
                <Sidebar/>

                <div className="content-page">
                    <div className="content">
                        <Navbar/>
                        <Outlet />
                    </div>
                    {/*<Footer />*/}
                </div>
            </div>
        </div>
    )
};

