import React from "react";
import {AlertLib} from "@lib";
import {parameters, userAvatarUpload, userInfo} from "@actions";
import {useParams} from "react-router-dom";
import {InfoTab, PasswordTab, PermissionsTab} from "./components";
import {InputFile} from "@components";

export const Info = React.memo(() => {

    let urlParams = useParams();

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({...prevState, ...newState}),
        {
            activeTab: 'settings',
            loading: false,
            file: false,
            showPassword: false,
            saveLoading: false,
            roles: [],
            params: {
                id: urlParams?.id,
                username: '',
                name: '',
                role: '',
                surname: '',
                phone: '',
                address: '',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    );

    const setParams = (data) => {
        setState({params: {...state.params, ...data}})
    }

    const loadData = async () => {
        setState({loading: true})

        let roleData = await parameters({name:'roles'});

        setState({roles: roleData?.data})

        let response = await userInfo({id: state.params.id});

        if (response) {
            if (response.status === "success" && response.data) {
                setParams({...response.data});
                setState({file:response.data.avatar})
            } else {
                AlertLib.toast({
                    icon: "error",
                    title: response.description,
                });
            }
            setState({loading: false})
        }
    };



    const uploadFile = async (avatar) => {
        let response = await userAvatarUpload({
            file: avatar,
            user_id: state.params.id,
        });

        setState({file:response.data})

        if (response?.status === "success"){
            AlertLib.toast({
                icon: response?.status,
                title: response?.description,
            });
        }
    };


    React.useEffect(() => {
        loadData()
    }, []);


    const TABS = [
        {
            key:'settings',
            title:'Settings',
            component:<InfoTab state={state} setParams={setParams} setState={setState}/>,
        },
        {
            key:'password',
            title:'Password',
            component:<PasswordTab state={state} setParams={setParams} setState={setState}/>,
        },
        {
            key:'permissions',
            title:'Permissions',
            component:<PermissionsTab state={state} setParams={setParams} setState={setState}/>,
        },
    ]

    const params = state.params;

    return (
        <div className="container-fluid">

            <div className="row mt-3">
                <div className="col-12">
                    <div className="card text-center">
                        <div className="card-body p-1">
                            <div className="d-flex align-items-center">

                                <div className="form-group">
                                    <InputFile
                                        size={140}
                                        avatar={state.file}
                                        uploadFile={uploadFile}
                                        onChange={(file) => setState({ file })}
                                        className="mx-3"
                                    />
                                </div>

                                <div className="text-start me-auto">
                                    <h4 className="mb-0 mt-2">{params.name} {params.surname}</h4>
                                    <p className="text-muted font-14">{params.role.label}</p>

                                    {/*<h4 className="font-13 text-uppercase">Address :</h4>*/}
                                    {/*<p className="text-muted font-13 mb-3">{params.address}</p>*/}

                                    <p className="text-muted mb-2 font-13">
                                        <strong>Full Name :</strong>
                                        <span className="ms-2">{params.name} {params.surname}</span>
                                    </p>

                                    <p className="text-muted mb-2 font-13">
                                        <strong>Mobile :</strong>
                                        <span className="ms-2">{params.phone}</span>
                                    </p>

                                    <p className="text-muted mb-2 font-13">
                                        <strong>Email :</strong>
                                        <span className="ms-2">{params.email}</span>
                                    </p>

                                    <p className="text-muted mb-2 font-13">
                                        <strong>Location :</strong>
                                        <span className="ms-2">{params.address}</span>
                                    </p>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <ul className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                {TABS.map(item=>(
                                    <li onClick={()=>setState({activeTab:item.key})} className="nav-item">
                                        <a href={`#${item.key}`} data-bs-toggle="tab" aria-expanded={item.key === state.activeTab}
                                           className={`nav-link rounded-0  ${item.key === state.activeTab && 'active'}`}>
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="tab-content position-relative">
                                {TABS.map(item=>(
                                    <div className={`tab-pane ${item.key === state.activeTab && 'show active'}`} id={item.key}>
                                        {state.activeTab === item.key && item.component}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
});
