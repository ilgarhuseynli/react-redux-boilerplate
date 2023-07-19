import {API_ROUTES} from "@config/routes";
import AxiosClient from "../library/AxiosClient";


export async function settingList(data) {
    return await AxiosClient.get(API_ROUTES.settings, {params:data}).catch(err => err.response)
}

export async function settingUpdate(data) {
    return await AxiosClient.put(API_ROUTES.settings,data).catch(err => err.response)
}
