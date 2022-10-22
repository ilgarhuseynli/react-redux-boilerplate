import {Outlet} from 'react-router-dom'
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";

import "../../assets/styles/index.scss";
import Footer from "./components/Footer";

const HomeLayout = () => {

    return (
        <div>
            <div className="wrapper">
                <Sidebar/>

                <div className="content-page">
                    <div className="content">
                        <Navbar/>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="#">Hyper</a>
                                                </li>
                                                <li className="breadcrumb-item"><a href="#">Pages</a>
                                                </li>
                                                <li className="breadcrumb-item active">Starter</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Starter</h4>
                                    </div>
                                </div>
                            </div>
                            {/*<Outlet/>*/}
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>

            <Rightbar/>

        </div>
    )
};

export default HomeLayout;
