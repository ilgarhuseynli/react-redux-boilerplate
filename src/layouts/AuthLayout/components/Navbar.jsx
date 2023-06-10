import {useDispatch, useSelector} from "react-redux";
import {setDarkMode, setSidebar} from "../../../stores/appSlice";

const Navbar = () => {

    const {darkMode,sidebarOpen} = useSelector(state => state.app)
    const dispatch = useDispatch()

    return (
        <div className="navbar-custom">
            <ul className="list-unstyled topbar-menu float-end mb-0">

                <li className="notification-list">
                    <span
                        style={{cursor:'pointer'}}
                        className="nav-link"
                        onClick={()=>dispatch(setDarkMode(!darkMode))}
                    >
                        <i className={` ${darkMode ? 'uil-sun':'uil-moon'} noti-icon`}/>
                    </span>
                </li>

                <li className="dropdown notification-list">
                    <a className="nav-link dropdown-toggle nav-user arrow-none me-0"
                       data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                       aria-expanded="false">
                        <span className="account-user-avatar">
                            <img src="assets/images/users/avatar-6.jpg" alt="user-image" className="rounded-circle"/>
                        </span>
                        <span>
                                <span className="account-user-name">Soeng Souy</span>
                                <span className="account-position">Founder</span>
                        </span>
                    </a>

                    <div
                        className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                        <div className=" dropdown-header noti-title">
                            <h6 className="text-overflow m-0">Welcome !</h6>
                        </div>

                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <i className="mdi mdi-account-circle me-1"></i>
                            <span>My Account</span>
                        </a>

                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <i className="mdi mdi-account-edit me-1"></i>
                            <span>Settings</span>
                        </a>

                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <i className="mdi mdi-lifebuoy me-1"></i>
                            <span>Support</span>
                        </a>

                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <i className="mdi mdi-lock-outline me-1"></i>
                            <span>Lock Screen</span>
                        </a>

                        <a href="javascript:void(0);" className="dropdown-item notify-item">
                            <i className="mdi mdi-logout me-1"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </li>

            </ul>
            <button
                onClick={()=>dispatch(setSidebar(!sidebarOpen))}
                className="button-menu-mobile open-left">
                <i className="mdi mdi-menu"></i>
            </button>

        </div>
    );
};

export default Navbar;
