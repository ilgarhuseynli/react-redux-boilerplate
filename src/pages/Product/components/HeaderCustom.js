import React from "react";
import {Link} from "react-router-dom";
import {InputLazy} from "@components";
import {Table} from "@components";
import {Lang, Parameters} from "@lib";
import Select from "react-select";
import {loadMinList} from "@actions";
import AsyncSelect from "react-select/async";

export const HeaderCustom = ({state, setState, reload, onDelete}) => {

    const columns = [
        {name: "Title"},
        {name: "Category"},
        {name: "Price"},
        {name: "Sku"},
        {name: "Position"},
        {name: "Status"},
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
                            defaultValue={state.filters.title}
                            onChange={() => {}}
                            action={(title) => setFilters({title})}
                            className="form-control"
                            placeholder={"Title"}
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
                            options={Parameters.getStatusList()}
                            value={state.filters.status}
                            onChange={status => setFilters({status})}
                            placeholder='All'
                            className='form-control'
                        />
                    </div>
                </div>

                <div className="col-md-3 mt-3">
                    <div className="input-group">
                        <span className="input-group-text">Category</span>
                        <AsyncSelect
                            isClearable
                            cacheOptions
                            loadOptions={(title) => loadMinList(title, 'product_categories')}
                            defaultOptions={state.product_categories}
                            value={state.filters.category}
                            onChange={(category) => setFilters({category})}
                            placeholder='All'
                            className='form-control'
                        />
                    </div>
                </div>

                <div className="col-md-3 mt-3">
                    <div className="input-group">
                        <span className="input-group-text">Position</span>
                        <Select
                            isClearable
                            options={state.product_positions}
                            value={state.filters.position}
                            onChange={(position) => setFilters({position})}
                            placeholder='All'
                            className='form-control'
                        />
                    </div>
                </div>

                <div className="col-md-3 mt-3">
                    <div className="input-group">
                        <span className="input-group-text">Sku</span>
                        <InputLazy
                            defaultValue={state.filters.sku}
                            onChange={() => {}}
                            action={(sku) => setFilters({sku})}
                            className="form-control"
                            placeholder={"Sku"}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};
