import React from "react";
import {useNavigate} from "react-router-dom";
import {categoryDelete, categoryList} from "@actions";
import {HeaderCustom, TableCustom, ViewRoutes} from "./components";
import {AlertLib} from "@lib";


export default function Category({type}){
    const navigate = useNavigate();

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({...prevState, ...newState}),
        {
            loading: true,
            data: [],
            count: 0,
            skip: 0,
            limit: 10,
            title: "",
            status: "",
            selectedIDs: [],
            hiddenColumns: [],
            sort: "created_at",
            sort_type: "desc",
        }
    );


    const loadData = async (params) => {
        setState({ loading: true, skip: params?.skip || 0 });
        let response = await categoryList({
            skip: params?.skip || 0,
            limit: state.limit || "",
            sort: state.sort || "",
            sort_type: state.sort_type || "",
            title: state?.title,
            status: state?.status?.value,
            type: type,
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
            let response = await categoryDelete({ id });
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


    React.useEffect(() => {
        loadData();
    }, [
        state.limit,
        state.sort,
        state.sort_type,
        type,
        state.title,
        state.status,
    ]);

    return(
        <div className="container-fluid">

            <ViewRoutes
                onClose={()=>navigate('')}
                loadData={loadData}
                type={type}
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
