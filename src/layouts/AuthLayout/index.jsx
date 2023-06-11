import {Outlet} from 'react-router-dom'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "../../assets/styles/index.scss";
import {useEffect} from "react";
import {settings} from "../../actions";

export default function AuthLayout() {

   const getSettings = async () => {
        const response = await settings();
        if (response) {
            return {
                account_data: response.account_data,
                permissions: response.permissions,
                timezone: response.timezone,
            };
        }
    }

    useEffect(()=>{

        getSettings()

    },[])

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

