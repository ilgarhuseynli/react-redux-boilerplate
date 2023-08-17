import React, {useEffect, useReducer} from "react";

export const ItemsTotal = ({items}) => {
    const [state, setState] = useReducer(
        (prevState, newState) => {
            return {...prevState, ...newState};
        },
        {
            totalToPay: 0,
            totalDiscount: 0,
        }
    );

    useEffect(() => {
        calculateTotals(items);
    }, [JSON.stringify(items)]);

    const calculateTotals = (items) => {
        let totalDiscount = 0;
        let totalToPay = 0;

        if (items.length) {
            items.map((row) => {
                totalToPay += parseFloat(row.total);
                totalDiscount += calculateDiscount(row);
            });
        }

        setState({
            totalToPay: parseFloat(totalToPay).toFixed(2),
            totalDiscount: parseFloat(totalDiscount).toFixed(2),
        });
    };

    const calculateDiscount = (item) => {
        let res = 0;
        if (!item.discount_value || !item.discount_type) {
            return res;
        }

        if (item.discount_type === 'percent') {
            let totalPrice = parseFloat(item.price * item.quantity).toFixed(2);

            res = (totalPrice * parseFloat(item.discount_value)) / 100;
        } else {
            res = parseFloat(item.discount_value) || 0;
        }

        return res;
    };

    const currencySymbol = 'AZN';
    return (
        <div className="totals-table-container row m-0">
            <div className="col-md-8"/>

            <div className="col-md-4 p-0">
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="font-weight-bold">
                                Total Discount
                            </td>
                            <td className="font-weight-bold">
                                {state.totalDiscount > 0 ? -1 * state.totalDiscount : '0.00'} {currencySymbol}
                            </td>
                        </tr>

                        <tr>
                            <td className="font-weight-bold">
                                Total To Pay
                            </td>
                            <td className="font-weight-bold">
                                {state.totalToPay} {currencySymbol}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
