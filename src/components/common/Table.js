import React from "react";
import {isEqual} from "@lib";
import {InputCheckbox, Loading} from "@components";
import {Lang} from "@lib";
import classNames from "classnames";

export const Table = React.forwardRef(({
                                           data = [],
                                           columns = {
                                               all: {},
                                               hidden: [],
                                           },
                                           loading = false,
                                           pagination = {
                                               count: 0,
                                               skip: 0,
                                               limit: 10,
                                               limitArray: [5, 10, 50, 100],
                                               paginationItemLimit: 5,
                                           },
                                           select = {selectable: false},
                                       }, ref) => {
    let {selectable, selectedIDs, onSelect, onSelectAll} = select;
    let {
        count,
        skip,
        limit,
        limitArray,
        paginationItemLimit,
        onPaginate,
        onTake,
    } = pagination;
    let pageCount = Math.ceil(count / limit);
    let currentPage = skip / limit + 1;
    let limitCount = Math.round((paginationItemLimit - 1) / 2);

    let showedColumns = columns.all.filter((item,key)=> !columns.hidden.includes(key))

    const [localLoading, setLocalLoading] = React.useState(loading);

    React.useEffect(() => {
        let timeout = loading ? 0 : 300;
        setTimeout(() => {setLocalLoading(loading)}, timeout);
    }, [loading]);

    const renderPaginationItem = (item) => {
        return (
            <li
                key={item}
                className={`page-item${item === currentPage ? " active" : ""}`}
            >
                <a className="page-link" onClick={() => onPaginate(item - 1)}>
                    {item}
                </a>
            </li>
        );
    };

    const showPagination = () => {
        if (pageCount > 1) {
            if (pageCount > paginationItemLimit) {
                if (currentPage + limitCount <= paginationItemLimit) {
                    return generatePaginationArray(1, paginationItemLimit).map((item) =>
                        renderPaginationItem(item)
                    );
                } else if (
                    currentPage + limitCount > paginationItemLimit &&
                    currentPage + limitCount < pageCount
                ) {
                    return generatePaginationArray(
                        currentPage - limitCount,
                        currentPage + limitCount
                    ).map((item) => renderPaginationItem(item));
                } else if (currentPage + limitCount >= pageCount) {
                    return generatePaginationArray(
                        pageCount - paginationItemLimit + 1,
                        pageCount
                    ).map((item) => renderPaginationItem(item));
                }
            } else {
                return generatePaginationArray(1, pageCount).map((item) =>
                    renderPaginationItem(item)
                );
            }
        }
    };

    const generatePaginationArray = (start, end) => {
        let arr = [];
        for (let i = start; i <= end; i++) {
            arr.push(i);
        }
        return arr;
    };

    const showRecord = () => {
        let from = parseInt(skip) + 1;
        let to = parseInt(skip) + parseInt(limit);
        return (
            <span className="ml-3">{`Showing ${from} - ${
                to < count ? to : count
            } of ${count} records`}</span>
        );
    };

    const showLimitSelect = () => {
        if (limitArray && limitArray.length) {
            return (
                <select
                    className="form-select limit-select w-auto me-2"
                    value={limit}
                    onChange={(e) => onTake(e.target.value)}
                >
                    {limitArray.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            );
        }
    };

    const showFirst = () => {
        return pageCount > paginationItemLimit &&
        currentPage >= paginationItemLimit - 1 ? (
            <li className="page-item">
                <a className="page-link" onClick={() => onPaginate(0)}>
                    {Lang.get("First")}
                </a>
            </li>
        ) : null;
    };

    const showLast = () => {
        return pageCount > paginationItemLimit &&
        currentPage + limitCount < pageCount ? (
            <li className="page-item">
                <a className="page-link" onClick={() => onPaginate(pageCount - 1)}>
                    {Lang.get("Last")}
                </a>
            </li>
        ) : null;
    };

    return (
        <div className="custom-table-container row">
            <div className="table-responsive">
                <table ref={ref} className="table table-bordered table-striped position-relative">
                    {localLoading && <Loading/>}
                    <thead>
                    <tr>
                        {select && selectable && (
                            <td className="text-center" style={{width: "40px"}}>
                                <InputCheckbox
                                    theme="primary"
                                    checked={isEqual(
                                        selectedIDs,
                                        data.map((item) => item.id)
                                    )}
                                    onChange={onSelectAll}
                                />
                            </td>
                        )}
                        {showedColumns.map((item, key) => (
                            <td
                                className={`font-weight-bold ${
                                    item.center ? "text-center" : "text-left"
                                }`}
                                style={{width: item.width || "auto"}}
                                key={key}
                            >
                                {item.name}
                            </td>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={showedColumns.length + 1} className="text-center">
                                {Lang.get("No Data to Display")}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, key) => (
                            <tr key={key}>
                                {select && selectable && (
                                    <td className="text-center">
                                        <InputCheckbox
                                            theme="primary"
                                            checked={selectedIDs.includes(item.id)}
                                            onChange={() => onSelect(item.id)}
                                        />
                                    </td>
                                )}
                                {showedColumns.map((column, key) => (
                                    <td
                                        className={column.center ? "text-center" : "text-left"}
                                        key={key}
                                    >
                                        {column.render
                                            ? column.render(
                                                column.key ? item[column.key] : item
                                            )
                                            : item[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
            <div className="col-md-4 d-flex align-items-center pl-0">
                {showLimitSelect()}
                {showRecord()}
            </div>
            <div className="col-md-4 offset-md-4 d-flex justify-content-end align-items-center mt-3 mt-md-0 pr-0">
                <ul className="pagination mb-0">
                    {showFirst()}
                    {showPagination()}
                    {showLast()}
                </ul>
            </div>
        </div>
    );
});


Table.ColumnFilter = React.forwardRef(
    ({
         columns = {
           all: {},
           hidden: [],
           required: 1,
         },
         setColumns,
         className,
         children,
         ...props
     }, ref) => {


        const onSetColumns = (index) =>{
            let hasIndex = columns.hidden.includes(index);

            if (hasIndex){
                let filtered = columns.hidden.filter((itemIndex)=> index !== itemIndex)
                setColumns(filtered)
            }else{
                columns.hidden.push(index)
                setColumns(columns.hidden)
            }
        }

        return (
            <div
                ref={ref}
                className={classNames("dropdown p-0", className)}
                {...props}
            >
                <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {children}
                </button>
                <div onClick={e=>e.stopPropagation()} className="dropdown-menu p-0 border-0 mt-1">
                  <ul className="list-group">

                    {columns.all && columns.all.map((item,key)=>{
                      return (
                        <li className="list-group-item" key={key} >
                            <label>
                                <input
                                    checked={!columns.hidden.includes(key)}
                                    disabled={key === columns.required}
                                    onChange={()=>onSetColumns(key)}
                                    className="form-check-input me-1"
                                    type="checkbox"
                                />
                                {item.name}
                            </label>

                        </li>
                      )
                    })}
                  </ul>
                </div>
            </div>
        );

    })
