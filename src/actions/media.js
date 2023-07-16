import {API_ROUTES} from "@config/routes";
import AxiosClient from "../library/AxiosClient";

export async function mediaUpload(data) {
    return await AxiosClient.post(API_ROUTES.mediaUpload, data).catch(err => err.response)
}
