

export const prepareOrderReq = (params,action = 'add') =>{

    let filteredItems = params.items.map((item)=>{
        return {
            ...item,
            product_id:item.product.value,
            discount_type:item.discount_type === 'percent' ? 1 : 2,
        }
    });

    return {
        ...params,
        items:filteredItems,
        payment_type:params.payment_type?.value,
        status:params.status?.value,
        customer_id:params.customer?.value,
    }
}

