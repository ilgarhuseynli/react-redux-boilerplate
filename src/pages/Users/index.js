import React from "react";
import {useEffect} from "react";
import {userList} from "../../actions/users";
import {TableCustom} from "./components";


export default function Users(){

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({...prevState, ...newState}),
        {
            loading: false,
            data: [],
            count: 0,
            skip: 0,
            limit: 10,
            title: "",
            selectedIDs: [],
            hiddenColumns: [],
            sort: "created_at",
            sort_type: "desc",
        }
    );



    const loadData = async (params) => {
        setState({ loading: true, skip: params?.skip || 0 });
        let response = await userList({
            skip: params?.skip || 0,
            limit: state.limit || "",
            sort: state.sort || "",
            sort_type: state.sort_type || "",
            title: state?.title || "",
            status: state.status?.value || "",
        });

        console.log(response)
        if (response) {
            setState({ loading: false });
            if (response.status === "success") {
                setState({ data: response.data, count: response.count });
            } else {
                setState({ data: [], count: 0 });
            }
        }
    };


    React.useEffect(() => {
        loadData();
    }, [state.limit, state.sort, state.sort_type, state.status,state.title]);


    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <h4 className="page-title">Users</h4>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">

                    <TableCustom
                        state={state}
                        setState={setState}
                        loadData={loadData}
                    />

                </div>
            </div>
        </div>
    )
}
