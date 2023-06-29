import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {Link, useNavigate} from "react-router-dom";
import {url} from "@lib";
import {useDispatch} from "react-redux";
import {logout} from "@stores/authSlice";
import {authLogout} from "@actions";

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        let response = await authLogout()

        if (response.status === 'success') {
            dispatch(logout());
            navigate(url('auth.login'))
        }
    }

    return (
        <div className="leftside-menu">

            <Link to={url('home')} className="logo text-center logo-light">
                <span className="logo-lg"><img src="assets/images/logo.png" alt="" height="16"/></span>
                <span className="logo-sm"><img src="assets/images/logo_sm.png" alt="" height="16"/></span>
            </Link>

            <Link to={url('home')} className="logo text-center logo-dark">
                <span className="logo-lg"><img src="assets/images/logo-dark.png" alt="" height="16"/></span>
                <span className="logo-sm"><img src="assets/images/logo_sm_dark.png" alt="" height="16"/></span>
            </Link>

            <div className="h-100" id="leftside-menu-container">
                <SimpleBar   style={{maxHeight: '100%'}}>

                    <ul className="side-nav">

                        <li className="side-nav-title side-nav-item">Navigation</li>

                        <li className="side-nav-item">
                            <Link to={url('home')} className="side-nav-link">
                                <i className="uil-home-alt"/>
                                {/*<span className="badge bg-success float-end">4</span>*/}
                                <span> Dashboard </span>
                            </Link>
                        </li>

                        <li className="side-nav-item">
                            <Link to={url('home.users')} className="side-nav-link">
                                <i className="uil-users-alt"/>
                                <span> Users </span>
                            </Link>
                        </li>



                        <li className="side-nav-item" onClick={logoutHandler}>
                            <a href="#" className='side-nav-link'>
                                <i className="uil-exit"/>
                                <span> Logout </span>
                            </a>
                        </li>


                        {/*<li className="side-nav-title side-nav-item">Apps</li>*/}


                        {/*<li className="side-nav-item">*/}
                        {/*    <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false"*/}
                        {/*       aria-controls="sidebarEcommerce" className="side-nav-link">*/}
                        {/*        <i className="uil-store"/>*/}
                        {/*        <span> Ecommerce </span>*/}
                        {/*        <span className="menu-arrow"></span>*/}
                        {/*    </a>*/}
                        {/*    <div className="collapse" id="sidebarEcommerce">*/}
                        {/*        <ul className="side-nav-second-level">*/}
                        {/*            <li>*/}
                        {/*                <a href="#">Products</a>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <a href="#">Products Details</a>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</li>*/}




                    </ul>
                    <div className="clearfix"></div>

                </SimpleBar>
            </div>
        </div>
    );
};

export default Sidebar;
