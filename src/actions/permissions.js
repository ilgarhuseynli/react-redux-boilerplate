import {API_ROUTES} from "@config/routes";
import AxiosClient from "../library/AxiosClient";


export async function permissions(data) {
    return await AxiosClient.get(API_ROUTES.permissions, {params:data}).catch(err => err.response)
}

export async function permissionsUpdate(data) {
    return await AxiosClient.put(API_ROUTES.permissions, data).catch(err => err.response)
}
