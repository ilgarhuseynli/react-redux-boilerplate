import {Outlet} from 'react-router-dom'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import {useEffect, useState} from "react";
import {settings} from "../../actions";
import {Auth} from "../../library/Auth";

import "../../assets/styles/index.scss";
import {Loading} from "../../components/common/Loading";

export default function AuthLayout() {

    const [loading,setLoading] = useState(true);

   const getSettings = async () => {
        const response = await settings();

        if (response.status === 'success') {
            let resData = response.data;
            Auth.setData({
                ...resData.account_data,
                permissions: resData.permissions,
                timezone: resData.timezone,
            });
        }

        setTimeout(()=>{
            setLoading(false)
        },500)
    }

    useEffect(()=>{

        getSettings()

    },[])

    if (loading){
        return (<Loading type="whole" />)
    }

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

