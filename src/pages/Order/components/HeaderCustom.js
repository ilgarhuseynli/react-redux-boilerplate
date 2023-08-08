import React from "react";
import {Link} from "react-router-dom";
import {InputLazy} from "@components";
import {Table} from "@components";
import {Lang, Parameters} from "@lib";
import Select from "react-select";
import {loadMinList} from "@actions";
import AsyncSelect from "react-select/async";
import DatePicker from "antd/lib/date-picker";
import moment from "moment";

export const HeaderCustom = ({state, setState, reload, onDelete}) => {

    const { RangePicker } = DatePicker;

    const columns = [
        {name: "Ticket number"},
        {name: "Address"},
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

                <div className="col-lg-5 col-md-3 col-12 mt-md-0 mt-3 order-md-2 order-3">
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
                <div className="col-md-3 mt-3">
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

                <div className="col-md-3 mt-3">
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

                <div className="col-md-3 mt-3">
                    <div className="input-group">
                        <RangePicker
                            allowEmpty={[true, true]}
                            value={[
                                state.filters.range.start ? state.filters.range.start : "",
                                state.filters.range.end ? state.filters.range.end : "",
                            ]}
                            onChange={(date, dateString) => {
                                console.log(date)
                                setFilters({
                                    range: { start: date[0], end: date[1]},
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
