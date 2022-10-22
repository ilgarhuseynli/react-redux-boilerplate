import {Outlet} from 'react-router-dom'
import "./styles/index.scss";

const AuthLayout = () => {
  return (
    <div className="app-container">
        <Outlet />
    </div>
  );
};

export default AuthLayout;
