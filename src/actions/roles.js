import {API_ROUTES} from "@config/routes";
import AxiosClient from "../library/AxiosClient";

export async function roleInfo(data) {
    return await AxiosClient.get(API_ROUTES.roles+'/'+data.id,{params:data}).catch(err => err.response)
}

export async function roleList(data) {
    return await AxiosClient.get(API_ROUTES.roles, {params:data}).catch(err => err.response)
}


export async function roleDelete(data) {
    return await AxiosClient.delete(API_ROUTES.roles+'/'+data.id).catch(err => err.response)
}


export async function roleStore(data) {
    return await AxiosClient.post(API_ROUTES.roles,data).catch(err => err.response)
}


export async function roleUpdate(data) {
    return await AxiosClient.put(API_ROUTES.roles+'/'+data.id,data).catch(err => err.response)
}

