import React from "react";
import {Lang} from "@lib";
import {Table} from "@components";
import moment from "moment";

export const TableCustom = ({state, setState,loadData}) => {

    const columns = [
        {
            key: 'name',
            name: Lang.get("Name"),
        },
        {
            name: Lang.get("Email"),
            key: 'email',
            center: false,
        },
        {
            name: Lang.get("CreatedAt"),
            center: false,
            sort: "created_at",
            render: (data) => (
                <span className="text-title fw-800">
                  {moment(data).format("YYYY-MM-DD HH:mm")}
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
            // columns={{all: columns, hidden: state.hiddenColumns}}
            columns={columns}
            pagination={{
                skip: state.skip,
                limit: state.limit,
                count: state.count,
                onTake: (limit) => setState({limit}),
                onPaginate: (page) => loadData({skip: page * state.limit}),
            }}
            sortable={{
                sort: state.sort,
                sortType: state.sort_type,
                onSort: (sort) => setState({...sort}),
            }}
            select={{
                selectedIDs: state.selectedIDs,
                onSelect: onSelect,
                onSelectAll: onSelectAll,
            }}
        />
    );
};
