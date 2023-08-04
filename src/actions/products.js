import {API_ROUTES} from "@config/routes";
import AxiosClient from "../library/AxiosClient";


export async function productInfo(data) {
    return await AxiosClient.get(API_ROUTES.products+'/'+data.id,{params:data}).catch(err => err.response)
}

export async function productList(data) {
    return await AxiosClient.get(API_ROUTES.products, {params:data}).catch(err => err.response)
}

export async function productDelete(data) {
    return await AxiosClient.delete(API_ROUTES.products+'/'+data.id).catch(err => err.response)
}

export async function productStore(data) {
    return await AxiosClient.post(API_ROUTES.products,data).catch(err => err.response)
}

export async function productUpdate(data) {
    return await AxiosClient.put(API_ROUTES.products+'/'+data.id,data).catch(err => err.response)
}

export async function productFileUpload(data) {
    return await AxiosClient.post(API_ROUTES.productFileUpload,data).catch(err => err.response)
}

export async function productFileDelete(data) {
    return await AxiosClient.delete(API_ROUTES.productFileDelete,{params:data}).catch(err => err.response)
}
