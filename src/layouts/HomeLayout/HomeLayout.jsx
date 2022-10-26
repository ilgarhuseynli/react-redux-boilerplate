import {Outlet} from 'react-router-dom'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import Footer from "./components/Footer";

import "../../assets/styles/index.scss";

const HomeLayout = () => {

    return (
        <div>
            <div className="wrapper">
                <Sidebar/>

                <div className="content-page">
                    <div className="content">
                        <Navbar/>
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>

            <Rightbar/>

        </div>
    )
};

export default HomeLayout;
