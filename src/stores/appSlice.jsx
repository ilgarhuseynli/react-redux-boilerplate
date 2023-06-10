import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    darkMode : !!JSON.parse(localStorage.getItem('darkMode')),
    sidebarOpen : !!JSON.parse(localStorage.getItem('sidebarOpen')),
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers : {
        setDarkMode : (state,action) => {
            let darkModeVal = !!action.payload;

            localStorage.setItem('darkMode',JSON.stringify(!!action.payload))
            state.darkMode = darkModeVal;

            if (darkModeVal){
                document.body.setAttribute('data-leftbar-theme','dark');
                document.getElementById('dark-style').removeAttribute('disabled');
                document.getElementById('light-style').setAttribute('disabled','disabled');
            }else{
                document.body.setAttribute('data-leftbar-theme','light');
                document.getElementById('light-style').removeAttribute('disabled');
                document.getElementById('dark-style').setAttribute('disabled','disabled');
            }

        },
        setSidebar : (state,action) => {
            let sidebarVal = !!action.payload;

            localStorage.setItem('sidebarOpen',JSON.stringify(!!action.payload))
            state.sidebarOpen = !!action.payload;

            if (sidebarVal){
                document.body.setAttribute('data-leftbar-compact-mode','');
                document.body.classList.add('sidebar-enable');
            }else{
                document.body.setAttribute('data-leftbar-compact-mode','condensed');
                document.body.classList.remove('sidebar-enable');
            }
        },
    }
})

export const {setSidebar,setDarkMode} = appSlice.actions
export default appSlice.reducer
