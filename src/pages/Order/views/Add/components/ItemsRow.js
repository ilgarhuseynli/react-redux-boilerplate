import React from "react";
import AsyncSelect from "react-select/async";
import {loadMinList} from "@actions";
import {Parameters} from "@lib";

export const ItemsRow = ({state, onColumnChange,onDelete, item, index}) => {

    return (
        <tr>
            <td>
                <AsyncSelect
                    isClearable
                    cacheOptions
                    loadOptions={(title) => loadMinList(title, 'products')}
                    defaultOptions={state.products}
                    value={item.product}
                    onChange={(product) => onColumnChange(index, product, 'product',)}
                    placeholder='Product'
                    className='form-control'
                    styles={{
                        control: (baseStyles) => ({
                            ...baseStyles,
                            width: '200px',
                        }),
                    }}
                />
            </td>
            <td>
                <input
                    onChange={(e) => onColumnChange(index, e.target.value, 'price')}
                    onFocus={(e) => e.target.select()}
                    className="form-control"
                    placeholder={"Price"}
                    value={item.price || 0}
                    type='number'
                    step='any'
                    min={0}
                />
            </td>
            <td>
                <input
                    onChange={(e) => onColumnChange(index, e.target.value, 'quantity')}
                    onFocus={(e) => e.target.select()}
                    className="form-control"
                    placeholder={"Quantity"}
                    value={item.quantity || ''}
                    type='number'
                    step='any'
                    min={1}
                />
            </td>
            <td className='d-flex'>
                <input
                    onChange={(e) => onColumnChange(index, e.target.value, 'discount_value')}
                    onFocus={(e) => e.target.select()}
                    className="form-control me-1"
                    placeholder={"Discount"}
                    value={item.discount_value || ''}
                    type='number'
                    step='any'
                    min={0}
                    style={{width:'150px'}}
                />

                <select
                    style={{width:'60px'}}
                    value={item.discount_type}
                    placeholder='type'
                    className='form-control p-0 text-center'
                    onChange={(e) => onColumnChange(index,e.target.value, 'discount_type')}
                >
                    {state.discount_types.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.sign}
                        </option>
                    ))}
                </select>

            </td>
            <td>
                <input
                    className="form-control"
                    placeholder={"Total"}
                    value={item.total || 0}
                    onChange={() => {
                    }}
                    // readOnly={true}
                />
            </td>
            <td>
                <i
                    onClick={()=>onDelete(index)}
                    className="uil-trash-alt btn btn-sm btn-light text-danger p-1"
                />
            </td>
        </tr>
    );
};
