//invoice
import {Api} from "fogito-core-ui";

export async function invoiceList(params) {
    return await Api.get("invoiceList",{data:params});
}

export async function invoiceInfo(params) {
    return await Api.get("invoiceInfo",{data:params});
}

export async function invoiceTotals(params) {
    return await Api.get("invoiceTotals",{data:params});
}

export async function invoiceDelete(params) {
    return await Api.post("invoiceDelete",{data:params});
}
 
export async function invoiceSend(params) {
    return await Api.get("invoiceSend",{data:params});
}

export async function invoiceEditfield(params) {
    return await Api.post("invoiceEditfield",{data:params});
}

export async function invoiceAdd(params) {
    return await Api.post("invoiceAdd",{data:params});
}

export async function invoiceEdit(params) {
    return await Api.post("invoiceEdit",{data:params});
}

export async function invoiceUpdate(params) {
    return await Api.post("invoiceUpdate",{data:params});
}

export async function invoiceAddMail(params) {
    return await Api.post("invoiceAddMail",{data:params});
}

