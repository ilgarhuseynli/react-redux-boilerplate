import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {multiList, orderDelete, orderList} from "@actions";
import {HeaderCustom, TableCustom, ViewRoutes} from "./components";
import {AlertLib} from "@lib";

export default function Order(){
    const navigate = useNavigate();

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({...prevState, ...newState}),
        {
            loading: true,
            order_statuses:[],
            payment_types:[],
            discount_types:[],
            data: [],
            count: 0,
            skip: 0,
            limit: 10,
            filters: {
                ticket: "",
                status: "",
                payment_type: "",
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

            start: state.filters.range.start ? state.filters.range.start.startOf('day').unix() : "",
            end: state.filters.range.end ? state.filters.range.end.endOf('day').unix() : "",

            sku: state.filters.sku || "",
            title: state.filters.title || "",
            position: state.filters.position?.value || "",
            category: state.filters.category?.value || "",
            status: state.filters.status?.value || "",
        });

        console.log(state.filters.reange)

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
                'discount_types',
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
