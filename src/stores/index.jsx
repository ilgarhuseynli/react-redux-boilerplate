import {configureStore} from "@reduxjs/toolkit";
import darkModeReducer from "./darkMode";
import appReducer from "./appSlice";
import authReducer from "./auth";


const store = configureStore({
    reducer : {
        app: appReducer,
        darkMode : darkModeReducer,
        auth:authReducer
    }
})


export default store;
