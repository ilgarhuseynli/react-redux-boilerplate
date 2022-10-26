import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    darkMode : false,
    sidebarOpen : true,
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers : {
        setSidebarOpen : (state,action) => {
            state.sidebarOpen = action.payload;
        },
        setDarkMode : (state,action) => {
            state.darkMode = action.payload;
        },
        toggle : (state) => {
            state.darkMode = !state.darkMode;
        },
    }
})

export const {setSidebarOpen,setDarkMode,toggle} = appSlice.actions
export default appSlice.reducer
