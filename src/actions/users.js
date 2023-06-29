import {API_ROUTES} from "@config/routes";
import AxiosClient from "../library/AxiosClient";


export async function userList(data) {
    return await AxiosClient.get(API_ROUTES.users, {params:data}).catch(err => err.response)
}


export async function userDelete(data) {
    return await AxiosClient.delete(API_ROUTES.users+'/'+data.id).catch(err => err.response)
}
