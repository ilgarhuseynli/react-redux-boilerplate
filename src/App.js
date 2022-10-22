import {RouterProvider, createBrowserRouter} from "react-router-dom";
import routes from "./config/routes";
import {useSelector} from "react-redux";

function App() {
    const {darkMode} = useSelector(state=>state.darkMode);

    let router = createBrowserRouter(routes)

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
