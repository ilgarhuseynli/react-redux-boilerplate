import axios from "axios";
import Swal from "sweetalert2";
import store from "../stores";
import {logout} from "../stores/auth";

const AxiosClient = () => {
    // Create instance
    let instance = axios.create({
        baseURL: process.env.REACT_APP_API_PATH,
        timeout: 1000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    instance.interceptors.response.use(function (response) {
        return response;
    },function (error) {

        //if error unauthorized
        if (error.response.status === 401){
            //logout
            store.dispatch(logout())
        }

        Swal.fire({
            title: 'Error',
            icon: 'error',
            text: error.response.data.message,
        })
        return Promise.reject(error);
    });

    return instance;
};


export default AxiosClient();
