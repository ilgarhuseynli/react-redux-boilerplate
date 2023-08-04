import React from "react";
import {Lang, tableStatusColumn} from "@lib";
import {Table} from "@components";
import moment from "moment";
import {Link} from "react-router-dom";

export const TableCustom = ({state, setState,loadData}) => {

    const columns = [
        {
            sort: "title",
            name: Lang.get("Title"),
            render: (data) => (
                <div>
                    <div className="d-flex align-items-center">
                        <img
                            alt='avatar'
                            src={data.image?.thumb}
                            className="table__avatar"
                            style={{width: "35px", height: "35px"}}
                        />
                        <div className="table__content">
                            <Link to={`edit/${data?.id}`}>{data?.title}</Link>
                            <p
                                className="text-muted fs-14 mb-0 lh-16"
                                style={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    width: 190,
                                    height: 17,
                                }}>
                                {data?.description}
                            </p>
                        </div>
                    </div>

                </div>
            ),
        },
        {
            key: 'category',
            name: Lang.get("Category"),
            render: (data) => (<span>{data ? data.label : '-'}</span>),
        },
        {
            sort: "price",
            name: Lang.get("Price"),
            render: (data) => (<span>{data.price ? data.price : '-'} {data.price && 'AZN'}</span>),
        },
        {
            sort: "sku",
            key: 'sku',
            name: Lang.get("Sku"),
            render: (data) => (<span>{data ? data : '-'}</span>),
        },
        {
            key: 'position',
            name: Lang.get("Position"),
            render: (data) => (<span>{data ? data.label : '-'}</span>),
        },
        {
            sort: "status",
            name: Lang.get("Status"),
            render: (data) => (tableStatusColumn(data.status)),
        },
        {
            name: Lang.get("CreatedAt"),
            center: false,
            sort: "created_at",
            render: (data) => (
                <span className="text-title fw-800">
                  {moment.unix(data.created_at).format("YYYY-MM-DD HH:mm")}
                </span>
            ),
        },
    ];


    const onSelect = (id) => {
        if (state.selectedIDs.includes(id)) {
            setState({selectedIDs: state.selectedIDs.filter((item) => item !== id),});
        } else {
            setState({selectedIDs: state.selectedIDs.concat([id])});
        }
    }

    const onSelectAll = () => {
        if (state.data.every((item) => state.selectedIDs.includes(item.id))) {
            setState({selectedIDs: []});
        } else {
            setState({selectedIDs: state.data.map((item) => item.id)});
        }
    }

    return (
        <Table
            data={state.data}
            loading={state.loading}
            columns={{all: columns, hidden: state.hiddenColumns}}
            pagination={{
                skip: state.skip,
                limit: state.limit,
                count: state.count,
                limitArray: [5, 10, 50, 100],
                paginationItemLimit:5,
                onTake: (limit) => setState({limit}),
                onPaginate: (page) => loadData({skip: page * state.limit}),
            }}
            sortable={{
                sort: state.sort,
                sortType: state.sort_type,
                onSort: (sort) => setState({...sort}),
            }}
            select={{
                selectable:true,
                selectedIDs: state.selectedIDs,
                onSelect: onSelect,
                onSelectAll: onSelectAll,
            }}
        />
    );
};
