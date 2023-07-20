import React from "react";
import {isEqual} from "@lib";
import {InputCheckbox, Loading} from "@components";
import {Lang} from "@lib";
import classNames from "classnames";
import {Skeleton} from "@mui/material";

export const Table = React.forwardRef(({
                                           data = [],
                                           columns = {
                                               all: {},
                                               hidden: [],
                                           },
                                           sortable = {
                                               sort: 'created_at',
                                               sortType: 'desc',
                                               onSort: ()=>{},
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

    let {selectable, selectedIDs, onSelectAll} = select;

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
                    onChange={(e) => onTake(parseInt(e.target.value))}
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
            <div className="table-responsive position-relative">

                <table ref={ref} className="table table-bordered table-striped ">
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
                            <TableHeadItem
                                sortable={sortable}
                                item={item}
                                key={key}
                            />
                        ))}
                    </tr>
                    </thead>
                    <TableBody
                        data={data}
                        select={select}
                        paginationLimit={pagination.limit}
                        localLoading={localLoading}
                        showedColumns={showedColumns}
                    />
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




const TableBody = ({localLoading,data,select,showedColumns,paginationLimit}) =>{

    if (localLoading){
        return (
            <tbody>
            {Array.from(new Array(paginationLimit)).map((row, key) => {
                return (
                    <tr key={key}>
                        {
                            select.selectable && (
                                <td className="text-center">
                                    <Skeleton animation="wave"/>
                                </td>
                            )
                        }
                        {
                            showedColumns.map((column, key) => (
                                <td key={key} className="text-center">
                                    <Skeleton  animation="wave" />
                                </td>
                            ))
                        }
                    </tr>
                )
            })}
            </tbody>
        )
    }


    return(
        <tbody>
        {data.length === 0 && (
            <tr>
                <td colSpan={showedColumns.length + 1} className="text-center">
                    {Lang.get("No Data to Display")}
                </td>
            </tr>
        )}

        {data.length> 0 && data.map((item, key) => (
            <TableRowItem
                showedColumns={showedColumns}
                select={select}
                item={item}
                key={key}
            />
        ))}
        </tbody>
    )

}




const TableRowItem = ({item,select,showedColumns}) =>{

    let {selectable, selectedIDs, onSelect} = select;

    return (
        <tr >
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
    )
}




const TableHeadItem = ({item,sortable}) =>{

    if (!item.sort){
        return (
            <td
                className={`font-weight-bold ${item.center ? "text-center" : "text-left"}`}
                style={{width: item.width || "auto"}}
            >
                {item.name}
            </td>
        )
    }

    let isSelectedSort = item.sort === sortable.sort;

    let upSortSelected = isSelectedSort && 'asc' === sortable.sortType;
    let downSortSelected = isSelectedSort && 'desc' === sortable.sortType;

    let upSortColor = upSortSelected ? "#4388b9" : "#D6D6D6";
    let downSortColor = downSortSelected ? "#4388b9" : "#D6D6D6";


    const onClickSort = () =>{
        let isSelectedSort = item.sort === sortable.sort;

        let sortType = 'asc';
        if (isSelectedSort){
            sortType = sortable.sortType === 'asc' ? 'desc' : 'asc';
        }

        sortable.onSort({sort:item.sort, sort_type: sortType })
    }


    return (
        <td
            className={`font-weight-bold ${item.center ? "text-center" : "text-left"}`}
            style={{width: item.width || "auto" , cursor:'pointer'}}
            onClick={onClickSort}
        >
            <div
                className="d-flex align-items-center justify-content-start position-relative"
                style={{paddingRight: '30px'}}
            >
                {item.name}

                <div
                    className="position-absolute d-flex align-items-center justify-content-center"
                    style={{width: '30px', right: '0px'}}
                >
                    <svg width="7" height="13" viewBox="0 0 8 13" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <line x1="3.83142" y1="0.0800184" x2="3.83139" y2="12.14"
                              stroke={downSortColor}></line>
                        <path d="M3.4762 12.2529L7.01173 9.32945" stroke={downSortColor}></path>
                        <line y1="-0.5" x2="4.58763" y2="-0.5"
                              transform="matrix(-0.770667 -0.637238 0.770667 -0.637238 4.53552 11.9728)"
                              stroke={downSortColor}
                        ></line>
                    </svg>
                    <svg width="7" height="13" viewBox="0 0 8 13" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <line x1="3.53381" y1="12.7178" x2="3.53385" y2="0.657772"
                              stroke={upSortColor}></line>
                        <line y1="-0.5" x2="4.58763" y2="-0.5"
                              transform="matrix(-0.770667 0.637238 -0.770667 -0.637238 3.53552 0.25293)"
                              stroke={upSortColor}></line>
                        <line y1="-0.5" x2="4.58763" y2="-0.5"
                              transform="matrix(0.770667 0.637238 -0.770667 0.637238 2.82971 0.825195)"
                              stroke={upSortColor}></line>
                    </svg>
                </div>
            </div>
        </td>
    )
}


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
                    className="btn btn-light dropdown-toggle w-100"
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
