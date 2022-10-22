// expenses
import {Api} from "fogito-core-ui";

export async function expensesAdd(params) {
    return await Api.post("expensesAdd",{data: params});
}

export async function expensesEdit(params) {
    return await Api.post("expensesEdit",{data: params});
}

export async function expensesList(params) {
    return await Api.get("expensesList",{data: params});
}

export async function expensesInfo(params) {
    return await Api.get("expensesInfo",{data: params});
}

export async function expensesDelete(params) {
    return await Api.get("expensesDelete",{data:params});
}

export async function expensesData(params) {
    return await Api.post("expensesData",{data: params});
}

export async function expensesAttachmentAdd(params) {
    return await Api.get("expensesAttachmentAdd",{data: params});
}

export async function expensesAttachmentList(params) {
    return await Api.post("expensesAttachmentList",{data: params});
}

export async function expensesAttachmentDelete(params) {
    return await Api.post("expensesAttachmentDelete",{data: params});
}


