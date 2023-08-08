import React from "react";
import {Lang, tableStatusColumn} from "@lib";
import {Table} from "@components";
import moment from "moment";
import {Link} from "react-router-dom";

export const TableCustom = ({state, setState, loadData}) => {

    const columns = [
        {
            sort: "ticket_number",
            name: Lang.get("N"),
            render: (data) => (<Link to={`edit/${data?.id}`}>{data?.ticket_number}</Link>),
        },
        {
            key: 'address',
            name: Lang.get("Address"),
            render: (data) => (<p
                className="text-muted fs-14 mb-0 lh-16"
                style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: 190,
                    height: 17,
                }}>
                {data}
            </p>),
        },
        {
            key: 'customer',
            name: Lang.get("Customer"),
            render: (data) => (<span>{data ? data.fullname : '-'}</span>),
        },
        {
            sort: "total_to_pay",
            name: Lang.get("Total"),
            render: (data) => (<span>{data.total_to_pay} {data.currency.label}</span>),
        },
        {
            sort: "total_discount",
            name: Lang.get("Discount"),
            render: (data) => (<span>{data.total_discount} {data.currency.label}</span>),
        },
        {
            key: 'creator',
            name: Lang.get("Creator"),
            render: (data) => (<span>{data ? data.fullname : '-'}</span>),
        },
        {
            key: "payment_type",
            name: 'Payment Type',
            render: (data) => (<span>{data ? data.label: '-'}</span>),
        },
        {
            key: "status",
            name: Lang.get("Status"),
            render: (data) => (<span>{data ? data.label: '-'}</span>),
        },

        {
            name: 'Order at',
            sort: "order_date",
            key: "order_date",
            // center: false,
            render: (data) => (
                <span className="text-title fw-800">
                    {data ? moment.unix(data).format("YYYY-MM-DD HH:mm") : '-'}
                </span>
            ),
        },
        {
            name: 'Completed at',
            sort: "completed_at",
            key: "completed_at",
            // center: false,
            render: (data) => (
                <span className="text-title fw-800">
                    {data ? moment.unix(data).format("YYYY-MM-DD HH:mm") : '-'}
                </span>
            ),
        },
        {
            name: Lang.get("CreatedAt"),
            center: false,
            key: "created_at",
            sort: "created_at",
            render: (data) => (
                <span className="text-title fw-800">
                  {moment.unix(data).format("YYYY-MM-DD HH:mm")}
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
                paginationItemLimit: 5,
                onTake: (limit) => setState({limit}),
                onPaginate: (page) => loadData({skip: page * state.limit}),
            }}
            sortable={{
                sort: state.sort,
                sortType: state.sort_type,
                onSort: (sort) => setState({...sort}),
            }}
            select={{
                selectable: true,
                selectedIDs: state.selectedIDs,
                onSelect: onSelect,
                onSelectAll: onSelectAll,
            }}
        />
    );
};
