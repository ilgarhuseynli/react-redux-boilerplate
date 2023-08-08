import {API_ROUTES} from "@config/routes";
import AxiosClient from "../library/AxiosClient";

export async function orderInfo(data) {
    return await AxiosClient.get(API_ROUTES.orders+'/'+data.id,{params:data}).catch(err => err.response)
}

export async function orderList(data) {
    return await AxiosClient.get(API_ROUTES.orders, {params:data}).catch(err => err.response)
}

export async function orderDelete(data) {
    return await AxiosClient.delete(API_ROUTES.orders+'/'+data.id).catch(err => err.response)
}

export async function orderStore(data) {
    return await AxiosClient.post(API_ROUTES.orders,data).catch(err => err.response)
}

export async function orderUpdate(data) {
    return await AxiosClient.put(API_ROUTES.orders+'/'+data.id,data).catch(err => err.response)
}
