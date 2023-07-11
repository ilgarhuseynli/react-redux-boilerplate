import React, {useState} from "react";
import {Loading} from "@components";
import {permissions} from "@actions";
import {AlertLib} from "@lib";
import {PermissionsSection} from "./PermissionsSection";

export const PermissionsTab = React.memo(({state, setState}) => {

    const [permissionsList, setPermissionsList] = useState({});

    const loadData = async () => {
        setState({loading: true})

        let response = await permissions({user_id: state.params.id, formated: true});

        if (response) {
            if (response.status === "success" && response.data) {
                setPermissionsList(response.data);
            } else {
                AlertLib.toast({
                    icon: "error",
                    title: response.description,
                });
            }
            setState({loading: false})
        }
    };


    React.useEffect(() => {
        loadData()
    }, []);


    console.log(permissionsList)

    return (
        <div>
            {state.loading && <Loading/>}

            <h5 className="mb-3 text-uppercase bg-light p-2">
                <i className="mdi mdi-key me-1"></i> Permissions
            </h5>

            <div className="row">
                <div className="accordion">
                    {Object.keys(permissionsList).map((listKey) => {
                        let sectionData = permissionsList[listKey];

                        return (
                            <div className="card mb-0">
                                <div className="card-header">
                                    <h5 className="m-0">
                                        <a className="custom-accordion-title collapsed d-block pt-2 pb-2"
                                           data-bs-toggle="collapse" href={`#${sectionData.value}`}
                                           aria-expanded="true" aria-controls={sectionData.value}>
                                            {sectionData.title}
                                            <i className="mdi mdi-chevron-down accordion-arrow"></i>
                                        </a>
                                    </h5>
                                </div>

                                <div id={sectionData.value} className="collapse">
                                    <div className="card-body">
                                        {Object.keys(sectionData.groups).map((groupKey) => (
                                            <PermissionsSection
                                                userId={state.params.id}
                                                data={sectionData.groups[groupKey]}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
});
