import React from "react";
import {Link} from "react-router-dom";
import {InputLazy} from "@components";
import {Table} from "@components";

export const HeaderCustom = ({state, setState, reload, onDelete}) => {

    const columns = [
        {name: "Name"},
        {name: "Phone"},
        // {name: "Role"},
        {name: "Email"},
        {name: "CreatedAt"},
    ];

    return (
        <div className="row my-3">
            {!!state.selectedIDs.length && (
                <div className="col col-md-auto mt-md-0 mt-3">
                    <button
                        data-filter-count={state.selectedIDs?.length}
                        className="btn btn-danger btn-block position-relative"
                        onClick={onDelete}>
                        <i className="uil-trash me-0"/>
                    </button>
                </div>
            )}

            {/* Refresh */}
            {!state.selectedIDs.length && (
                <div className="col-md-auto col mt-md-0 mt-3">
                    <button
                        className="btn btn-light btn-white"
                        onClick={() => reload()}
                    >
                        <i  className="uil-refresh text-primary"></i>
                    </button>
                </div>
            )}

            <div className="col-lg-5 col-md-3 col-12 mt-md-0 mt-3 order-md-2 order-3">
                <div className="input-group">
                    <span className="input-group-text">
                        <i className='mdi mdi-magnify' />
                    </span>

                    <InputLazy
                        defaultValue={state.name}
                        onChange={() => { }}
                        action={(keyword) => setState({keyword})}
                        className="form-control"
                        placeholder={"Keyword"}
                    />
                </div>
            </div>
            {/*<div className="col-lg-3 col-md-3 col-12 mt-md-0 mt-3 order-md-2 order-3">*/}
            {/*    <div className="input-group">*/}
            {/*        <span className="input-group-text">Role</span>*/}

            {/*        <Select*/}
            {/*            isClearable*/}
            {/*            options={roles}*/}
            {/*            value={state.role}*/}
            {/*            onChange={role => setState({role})}*/}
            {/*            placeholder='Role'*/}
            {/*            className='form-control'*/}
            {/*        />*/}

            {/*    </div>*/}
            {/*</div>*/}

            <div className="col-md-auto col-6 mt-md-0 mt-3 order-md-2 order-4 ms-md-auto">
                <Table.ColumnFilter
                    columns={{all: columns, hidden: state.hiddenColumns, required:0}}
                    className="btn btn-block btn-white"
                    setColumns={(hiddenColumns) => setState({hiddenColumns})}
                >
                    <i className="uil-sliders-v me-2"/> Columns
                </Table.ColumnFilter>
            </div>

            <div
                className="col-md-auto col mt-md-0 mt-3 order-md-4 order-2"
            >
                <Link to={`add`} className="btn btn-success btn-block">
                    <i className="uil-plus"/>
                </Link>
            </div>
        </div>
    );
};
