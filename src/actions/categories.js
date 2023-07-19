import {API_ROUTES} from "@config/routes";
import AxiosClient from "../library/AxiosClient";


export async function categoryInfo(data) {
    return await AxiosClient.get(API_ROUTES.categories+'/'+data.id,{params:data}).catch(err => err.response)
}

export async function categoryList(data) {
    return await AxiosClient.get(API_ROUTES.categories, {params:data}).catch(err => err.response)
}

export async function categoryDelete(data) {
    return await AxiosClient.delete(API_ROUTES.categories+'/'+data.id).catch(err => err.response)
}

export async function categoryStore(data) {
    return await AxiosClient.post(API_ROUTES.categories,data).catch(err => err.response)
}

export async function categoryUpdate(data) {
    return await AxiosClient.put(API_ROUTES.categories+'/'+data.id,data).catch(err => err.response)
}

