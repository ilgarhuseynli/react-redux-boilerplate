import {useDispatch, useSelector} from "react-redux";
import {setDarkMode, setSidebar} from "@stores/appSlice";
import {Auth, url} from "@lib";
import {Link, useNavigate} from "react-router-dom";
import {authLogout} from "@actions";
import {logout} from "@stores/authSlice";

const Navbar = () => {

    const {darkMode,sidebarOpen} = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutHandler = async () => {
        let response = await authLogout()

        if (response.status === 'success') {
            dispatch(logout());
            navigate(url('auth.login'))
        }
    }

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
                       data-bs-toggle="dropdown"  role="button" aria-haspopup="false"
                       aria-expanded="false">
                        <span className="account-user-avatar">
                            <img
                                src={Auth.get('avatar')['thumbnail']}
                                alt="user-image"
                                style={{objectFit:'cover'}}
                                className="rounded-circle"
                            />
                        </span>
                        <span>
                                <span className="account-user-name">{Auth.get('name')}</span>
                                <span className="account-position">{Auth.get('email')}</span>
                        </span>
                    </a>

                    <div
                        className="dropdown-menu dropdown-menu-end dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                        <div className=" dropdown-header noti-title">
                            <h6 className="text-overflow m-0">Welcome !</h6>
                        </div>

                        <Link to={`users/edit/${Auth.get('id')}`} className="dropdown-item notify-item">
                            <i className="mdi mdi-account-circle me-1"></i>
                            <span>My Account</span>
                        </Link>

                        <span onClick={logoutHandler} className="dropdown-item notify-item">
                            <i className="mdi mdi-logout me-1"></i>
                            <span>Logout</span>
                        </span>
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
