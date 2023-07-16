import {API_ROUTES} from "@config/routes";
import AxiosClient from "../library/AxiosClient";


export async function userInfo(data) {
    return await AxiosClient.get(API_ROUTES.users+'/'+data.id,{params:data}).catch(err => err.response)
}

export async function userList(data) {
    return await AxiosClient.get(API_ROUTES.users, {params:data}).catch(err => err.response)
}


export async function userDelete(data) {
    return await AxiosClient.delete(API_ROUTES.users+'/'+data.id).catch(err => err.response)
}


export async function userStore(data) {
    return await AxiosClient.post(API_ROUTES.users,data).catch(err => err.response)
}


export async function userUpdate(data) {
    return await AxiosClient.put(API_ROUTES.users+'/'+data.id,data).catch(err => err.response)
}

export async function userPasswordUpdate(data) {
    return await AxiosClient.put(API_ROUTES.usersPasswordEdit,data).catch(err => err.response)
}

export async function userAvatarUpload(data) {
    return await AxiosClient.post(API_ROUTES.userAvatarUpload,data).catch(err => err.response)
}

export async function userAvatarDelete(data) {
    return await AxiosClient.delete(API_ROUTES.userAvatarDelete,data).catch(err => err.response)
}
