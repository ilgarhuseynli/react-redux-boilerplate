//invoiceItems
import {Api} from "fogito-core-ui";

export async function invoiceItemsList(params) {
    return await Api.get("invoiceItemsList",{data:params});
}

export async function invoiceItemsInfo(params) {
    return await Api.get("invoiceItemsInfo",{data:params});
}

export async function invoiceItemsDelete(params) {
    return await Api.get("invoiceItemsDelete",{data:params});
}
export async function invoiceItemsDeletemulti(params) {
    return await Api.get("invoiceItemsDeletemulti",{data:params});
}

export async function invoiceItemsAdd(params) {
    return await Api.post("invoiceItemsAdd",{data:params});
}

export async function invoiceItemsEdit(params) {
    return await Api.post("invoiceItemsEdit",{data:params});
}
