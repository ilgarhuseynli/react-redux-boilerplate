import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {multiList, orderDelete, orderList} from "@actions";
import {HeaderCustom, TableCustom, ViewRoutes} from "./components";
import {AlertLib} from "@lib";
import moment from "moment";

export default function Order(){
    const navigate = useNavigate();

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({...prevState, ...newState}),
        {
            loading: true,
            order_statuses:[],
            payment_types:[],
            users:[],
            employees:[],
            data: [],
            count: 0,
            skip: 0,
            limit: 10,
            filters: {
                ticket: "",
                status: "",
                user: "",
                creator: "",
                payment_type: "",
                total: {min:'',max:''},
                discount: {min:'',max:''},
                range_type: {label:'Created at',value:'created_at'},
                range: { start:'', end:'' },
            },
            selectedIDs: [],
            hiddenColumns: [],
            sort: "created_at",
            sort_type: "desc",
        }
    );


    const loadData = async (params) => {
        setState({ loading: true, skip: params?.skip || 0 });
        let response = await orderList({
            skip: params?.skip || 0,
            limit: state.limit || "",
            sort: state.sort || "",
            sort_type: state.sort_type || "",

            range_type: state.filters.range_type?.value || "",
            // start: state.filters.range.start ? state.filters.range.start.startOf('day').unix() : "",
            // end: state.filters.range.end ? state.filters.range.end.endOf('day').unix() : "",

            start: state.filters.range.start ? moment(`${state.filters.range.start} 00:00:00`).unix() : "",
            end: state.filters.range.end ? moment(`${state.filters.range.end} 23:59:59`).unix() : "",

            ticket: state.filters.ticket || "",
            user: state.filters.user?.value || "",
            creator: state.filters.creator?.value || "",
            status: state.filters.status?.value || "",
            payment_type: state.filters.payment_type?.value || "",
            total: state.filters.total?.value || "",
            discount: state.filters.discount?.value || "",
        });


        if (response) {
            setState({ loading: false });
            if (response.status === "success") {
                setState({ data: response.data, count: response.count });
            } else {
                setState({ data: [], count: 0 });
            }
        }
    };


    const onDelete = async () => {
        let confirmed = await AlertLib.deleteCondition()
        if (!confirmed) return;

        let count = 1;
        let total = state.selectedIDs.length;
        setState({ loading: true });
        for (const id of state.selectedIDs) {
            let response = await orderDelete({ id });
            if (response?.status === "success") {
                if (count >= total) {
                    setState({ loading: false, selectedIDs: [] });
                    AlertLib.toast({
                        title: response.description,
                        icon: "success",
                    });
                    await loadData();
                }
                count++;
            } else {
                setState({ loading: false });
                await AlertLib.toast({
                    title: response.description,
                    icon: "error",
                });
            }
        }
    }


    const loadLists = async () => {
        let responseList = await multiList({
            keys:[
                'order_statuses',
                'payment_types',
                'users',
                'employees',
            ]
        });

        if (responseList?.status === "success"){
            setState({ ...responseList.data})
        }
    }

    useEffect(()=>{
        loadLists();
    },[])


    React.useEffect(() => {
        loadData();
    }, [
        state.filters,
        state.sort,
        state.limit,
        state.sort_type,
    ]);

    return(
        <div className="container-fluid">

            <ViewRoutes
                onClose={()=>navigate('')}
                loadData={loadData}
            />

            <HeaderCustom
                state={state}
                setState={setState}
                onDelete={onDelete}
                reload={loadData}
            />

            <div>
                <TableCustom
                    state={state}
                    setState={setState}
                    loadData={loadData}
                />
            </div>
        </div>
    )
}
