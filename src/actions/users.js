import {API_ROUTES} from "../config/routes";
import AxiosClient from "../library/AxiosClient";


export async function userList(data) {
    return await AxiosClient.post(API_ROUTES.authLogin, data).catch(err => err.response)
}

