import React from "react";
import {Link} from "react-router-dom";
import {InputLazy} from "@components";
import {Table} from "@components";
import {Lang, Parameters} from "@lib";
import Select from "react-select";
import {loadMinList} from "@actions";
import AsyncSelect from "react-select/async";
import DatePicker from "antd/lib/date-picker";
import dayjs from 'dayjs';

export const HeaderCustom = ({state, setState, reload, onDelete}) => {

    const columns = [
        {name: "Ticket number"},
        {name: "Address"},
        {name: "Phone"},
        {name: "Customer"},
        {name: "Total"},
        {name: "Discount"},
        {name: "Creator"},
        {name: "Payment type"},
        {name: "Status"},
        {name: "OrderDate"},
        {name: "CompletedAt"},
        {name: "CreatedAt"},
    ];


    const setFilters = (data) =>{
        setState({filters:{...state.filters,...data}})
    }


    return (
        <div className='my-3'>
            <div className="row">
                {!!state.selectedIDs.length && (
                    <div className="col-6 col-md-auto mt-md-0">
                        <button
                            data-filter-count={state.selectedIDs?.length}
                            className="btn btn-danger btn-block position-relative w-100"
                            onClick={onDelete}>
                            <i className="uil-trash me-0"/>
                        </button>
                    </div>
                )}

                {/* Refresh */}
                {!state.selectedIDs.length && (
                    <div className="col-md-auto col-6 mt-md-0 mt-3">
                        <button
                            className="btn btn-light btn-white w-100"
                            onClick={() => reload()}
                        >
                            <i  className="uil-refresh text-primary"></i>
                        </button>
                    </div>
                )}

                <div className="col-lg-4 col-md-6 col-12 mt-md-0 mt-3 order-md-2 order-3">
                    <div className="input-group">
                        <span className="input-group-text"><i className='mdi mdi-magnify' /></span>
                        <InputLazy
                            defaultValue={state.filters.ticket}
                            onChange={() => {}}
                            action={(ticket) => setFilters({ticket})}
                            className="form-control"
                            placeholder={"Ticket N"}
                        />
                    </div>
                </div>

                <div className="col-lg-3 col-md-4 col-12 mt-md-0 mt-3 order-md-2 order-3">
                    <div className="input-group">
                        <span className="input-group-text">Status</span>
                        <Select
                            isClearable
                            options={state.order_statuses}
                            value={state.filters.status}
                            onChange={status => setFilters({status})}
                            placeholder='All'
                            className='form-control'
                        />
                    </div>
                </div>

                <div className="col-md-auto col-6 mt-md-0 mt-3 order-md-3 order-3">
                    <button
                        className="btn btn-light w-100"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseProductFilter"
                        aria-expanded="false"
                        aria-controls="collapseProductFilter"
                    >
                        <i className="uil-filter me-2" />

                        {Lang.get("Filters")}
                    </button>
                </div>

                <div className="col-md-auto col-6 mt-md-0 mt-3 order-md-2 order-4 ms-md-auto">
                    <Table.ColumnFilter
                        columns={{all: columns, hidden: state.hiddenColumns, required:0}}
                        className="btn btn-block btn-white w-100"
                        setColumns={(hiddenColumns) => setState({hiddenColumns})}
                    >
                        <i className="uil-sliders-v me-2"/> Columns
                    </Table.ColumnFilter>
                </div>

                <div className="col-md-auto col-6 mt-md-0 mt-3 order-md-4 order-2">
                    <Link to={`add`} className="btn btn-success btn-block w-100">
                        <i className="uil-plus"/>
                    </Link>
                </div>
            </div>

            <div className="row collapse" id="collapseProductFilter" >

                <div className="col-lg-3 col-md-6 mt-3">
                    <div className="input-group">
                        <span className="input-group-text">Payment Type</span>
                        <Select
                            isClearable
                            options={state.payment_types}
                            value={state.filters.payment_type}
                            onChange={(payment_type) => setFilters({payment_type})}
                            placeholder='All'
                            className='form-control'
                        />
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-3">
                    <div className="input-group">
                        <span className="input-group-text">Address</span>
                        <InputLazy
                            defaultValue={state.filters.address}
                            onChange={() => {}}
                            action={(address) => setFilters({address})}
                            className="form-control"
                            placeholder='Address'
                        />
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-3">
                    <div className="input-group">
                        <span className="input-group-text">Phone</span>
                        <InputLazy
                            defaultValue={state.filters.phone}
                            onChange={() => {}}
                            action={(phone) => setFilters({phone})}
                            className="form-control"
                            placeholder='Phone'
                        />
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-3">
                    <div className="input-group">
                        <span className="input-group-text">Customer</span>
                        <AsyncSelect
                            isClearable
                            cacheOptions
                            loadOptions={(title) => loadMinList(title, 'users')}
                            defaultOptions={state.users}
                            value={state.filters.user}
                            onChange={(user) => setFilters({user})}
                            placeholder='All'
                            className='form-control'
                        />
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-3">
                    <div className="input-group">
                        <span className="input-group-text">Creator</span>
                        <AsyncSelect
                            isClearable
                            cacheOptions
                            loadOptions={(title) => loadMinList(title, 'employees')}
                            defaultOptions={state.employees}
                            value={state.filters.creator}
                            onChange={(creator) => setFilters({creator})}
                            placeholder='All'
                            className='form-control'
                        />
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-3">
                    <div className="input-group">
                        <span className="input-group-text">Total</span>
                        <InputLazy
                            defaultValue={state.filters.total.min}
                            onChange={() => {}}
                            action={(min) => setFilters({total:{...state.filters.total,min}})}
                            className="form-control"
                            placeholder='min'
                            type='number'
                        />
                        <InputLazy
                            defaultValue={state.filters.total.max}
                            onChange={() => {}}
                            action={(max) => setFilters({total:{...state.filters.total,max}})}
                            className="form-control"
                            placeholder='max'
                            type='number'
                        />
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 mt-3">
                    <div className="input-group">
                        <span className="input-group-text">Discount</span>
                        <InputLazy
                            defaultValue={state.filters.discount.min}
                            onChange={() => {}}
                            action={(min) => setFilters({discount:{...state.filters.discount,min}})}
                            className="form-control"
                            placeholder='min'
                            type='number'
                        />
                        <InputLazy
                            defaultValue={state.filters.discount.max}
                            onChange={() => {}}
                            action={(max) => setFilters({discount:{...state.filters.discount,max}})}
                            className="form-control"
                            placeholder='max'
                            type='number'
                        />
                    </div>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="input-group">
                        <div className="input-group-prepend" style={{ width: "135px" }}>
                            <Select
                                className="form-control"
                                value={state.filters.range_type}
                                onChange={type => setFilters({range_type: type })}
                                options={Parameters.getRangeTypes()}
                            />
                        </div>

                        <DatePicker.RangePicker
                            allowEmpty={[true, true]}
                            value={[
                                state.filters.range.start ? dayjs(state.filters.range.start,'YYYY-MM-DD') : "",
                                state.filters.range.end ? dayjs(state.filters.range.end,'YYYY-MM-DD') : "",
                            ]}
                            onChange={(date, dateString) => {
                                setFilters({
                                    range: { start: dateString[0], end: dateString[1]},
                                });
                            }}
                            placeholder={['Start','End']}
                            className="form-control d-flex"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
