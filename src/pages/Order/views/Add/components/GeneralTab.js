import React from "react";
import AsyncSelect from "react-select/async";
import {loadMinList, userInfo} from "@actions";
import Select from "react-select";
import {AutoComplete, DatePicker} from "antd";
import dayjs from "dayjs";

export const GeneralTab = ({state, setParams,setState}) => {


    const onChangeCustomer = async (customer) => {
        let paramsBind = {
            customer,
        }
        if (customer) {
            let response = await userInfo({id: customer.value});

            if (response.status === "success" && response.data) {
                paramsBind['phone'] = response.data.phone;
                paramsBind['address'] = response.data.address_list[0];

                setState({address_list: response.data.address_list.map((item)=>({value:item}))})
            }
        }

        setParams(paramsBind);
    }

    return (
        <div className="row">

            <div className="col-md-6 mb-2">
                <label className="form-label">Customer</label>
                <AsyncSelect
                    isClearable
                    cacheOptions
                    loadOptions={(title) => loadMinList(title, 'users')}
                    defaultOptions={state.users}
                    value={state.params.customer}
                    onChange={(customer) => onChangeCustomer(customer)}
                    placeholder='Customer'
                    className='form-control'
                    isLoading={state.loading}
                />
            </div>

            <div className="col-md-6 mb-2">
                <label className="form-label required">Address</label>

                <AutoComplete
                    value={state.params.address}
                    onChange={(data) => setParams({address: data})}
                    placeholder='Address'
                    className="form-control"
                    options={state.address_list}
                    // filterOption={(inputValue, option) => option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1}
                />
            </div>



            <div className="col-md-6 mb-2">
                <label className="form-label required">Phone</label>
                <input
                    type='number'
                    value={state.params.phone}
                    onChange={(e) => setParams({phone: e.target.value})}
                    placeholder='Phone'
                    className="form-control"
                />
            </div>

            <div className="col-md-6 mb-2">
                <label className="form-label required">Payment type</label>
                <Select
                    isClearable
                    options={state.payment_types}
                    value={state.params.payment_type}
                    onChange={(payment_type) => setParams({payment_type})}
                    placeholder='Payment type'
                    className='form-control'
                />
            </div>

            <div className="col-md-6 mb-2">
                <label className="form-label required">Status</label>
                <Select
                    isClearable
                    options={state.order_statuses}
                    value={state.params.status}
                    onChange={(status) => setParams({status})}
                    placeholder='Status'
                    className='form-control'
                />
            </div>


            <div className="col-md-6 mb-2">
                <label className="form-label required">Order date</label>
                <DatePicker
                    value={state.params.order_date ? dayjs(state.params.order_date, 'YYYY-MM-DD') : null}
                    onChange={(date, dateString) => setParams({order_date: dateString})}
                    placeholder={'Order date'}
                    className="form-control"
                />
            </div>

            <div className="col-12 mb-2">
                <label className="form-label">Note</label>
                <textarea
                    value={state.params.note}
                    onChange={(e) => setParams({note: e.target.value})}
                    placeholder='Note'
                    className="form-control"
                />
            </div>

            <div className="col-12 mb-2">
                <label className="form-label">Manager note</label>
                <textarea
                    value={state.params.manager_note}
                    onChange={(e) => setParams({manager_note: e.target.value})}
                    placeholder='Manager note'
                    className="form-control"
                />
            </div>

        </div>
    )
        ;
};
