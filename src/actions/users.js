import {API_ROUTES} from "@config/routes";
import AxiosClient from "../library/AxiosClient";


export async function userList(data) {
    return await AxiosClient.get(API_ROUTES.users, data).catch(err => err.response)
}

