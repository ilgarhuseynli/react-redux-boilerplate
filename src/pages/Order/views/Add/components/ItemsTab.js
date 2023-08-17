import React from "react";
import {ItemsTotal} from "./ItemsTotal";
import {Lang} from "@lib";
import {ItemsRow} from "./ItemsRow";

export const ItemsTab = ({state, setParams}) => {

    const onAdd = () => {
        state.params.items.push({
            product:false,
            price:0,
            quantity:1,
            discount_value:0,
            discount_type: 'amount', // 1 - percent / 2 - amount
            total:0,
        });

        setParams({items:state.params.items})
    }

    const items = state.params.items;

    const onDelete = (id) => {
        let array = items;
        array.splice(id, 1);
        setParams({items:array});
    };


    const onColumnChange = (index,value,colName) => {
        let array = items;
        value = value || 0;
        array[index][colName] = value;


        let updateTotal = false;
        if (colName === 'product'){
            updateTotal = true;
            array[index]['price'] = value["price"] ? parseFloat(value["price"]) : 0;
        }

        if (['quantity','price','discount_value','discount_type'].includes(colName) || updateTotal){
            let quantity = parseFloat(array[index]["quantity"]);
            let price = parseFloat(array[index]["price"]);
            let discount_value = parseFloat(array[index]["discount_value"]);
            let discount_type = array[index]["discount_type"];

            let totalPrice = parseFloat(price * quantity).toFixed(2);

            if (discount_type === 'percent')
                discount_value = (totalPrice * discount_value) / 100;

            array[index]["total"] = parseFloat(totalPrice - discount_value).toFixed(2);
        }

        setParams({items:array});
    };


    return (
        <>
            <table className="table w-100 m-0 order-invoice-table">
                <thead>
                <tr>
                    <th>{Lang.get("Product")}</th>
                    <th>{Lang.get("Price")}</th>
                    <th>{Lang.get("Quantity")}</th>
                    <th>{Lang.get("Discount")}</th>
                    <th>{Lang.get("Total")}</th>
                    <th width='10'></th>
                </tr>
                </thead>

                <tbody>

                {items.length > 0 && items.map((item,index) => (
                    <ItemsRow
                        key={index}
                        index={index}
                        onDelete={onDelete}
                        onColumnChange={onColumnChange}
                        state={state}
                        item={item}
                    />
                ))}
                </tbody>
            </table>

            <button
                onClick={onAdd}
                className="btn btn-primary btn-block px-4 mt-3"
            >
                <i className="uil-plus"/>
            </button>

            <div className="form-row">
                <div className="form-group w-100">
                    <ItemsTotal
                        items={items}
                    />
                </div>
            </div>
        </>
    );
};
