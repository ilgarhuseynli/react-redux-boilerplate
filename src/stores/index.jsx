import {configureStore} from "@reduxjs/toolkit";
import darkMode from "./darkMode";
import auth from "./auth";


const store = configureStore({
    reducer : {
        darkMode,
        auth
    }
})


export default store;
