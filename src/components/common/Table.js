import React from "react";
import { isEqual } from "@lib/utils";
import { InputCheckbox } from "@components";
import { Lang } from "@lib";

export const Table = ({
  data = [],
  columns = [],
  pagination = {
    count: 0,
    skip: 0,
    limit: 10,
    limitArray: [],
    paginationItemLimit: 5,
  }, //If user will not send pagination property
  select = { selectable: false }, //If user will not send select property
}) => {
  let { selectable, selectedIDs, onSelect, onSelectAll } = select;
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
          className="form-control-alternative custom-select w-auto"
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
      <div className="w-100">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                {select && selectable && (
                  <td className="text-center" style={{ width: "40px" }}>
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
                {columns.map((item, key) => (
                  <td
                    className={`font-weight-bold ${
                      item.center ? "text-center" : "text-left"
                    }`}
                    style={{ width: item.width || "auto" }}
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
                  <td colSpan={columns.length + 1} className="text-center">
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
                    {columns.map((column, key) => (
                      <td
                        className={column.center ? "text-center" : "text-left"}
                        key={key}
                      >
                        {column.render
                          ? column.render(
                              column.key === "actions" ? item : item[column.key]
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
          <ul className="pagination">
            {showFirst()}
            {showPagination()}
            {showLast()}
          </ul>
        </div>
      </div>
  );
};
