import {RouterProvider, createBrowserRouter} from "react-router-dom";
import routes from "./config/routes";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setDarkMode, setSidebar} from "./stores/appSlice";

function App() {
    const {darkMode,sidebarOpen} = useSelector(state => state.app)
    const dispatch = useDispatch()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(()=>{
        dispatch(setDarkMode(darkMode))
        dispatch(setSidebar(sidebarOpen))
    },[])

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);

            if (window.innerWidth <= 767){
                dispatch(setSidebar(false))
            }
        };

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    let router = createBrowserRouter(routes)

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
