import React from "react";
import {AlertLib} from "@lib";
import {userInfo, userPasswordUpdate, userUpdate} from "@actions";
import {useParams} from "react-router-dom";
import {roleList} from "../../../../actions/roles";
import {Loading, Spinner} from "@components";
import Select from "react-select";

export const Info = React.memo(({onClose, reload}) => {

    let urlParams = useParams();

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({...prevState, ...newState}),
        {
            loading: false,
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

    const onSubmit = async (e) => {
        setState({saveLoading: true});
        if (!state.saveLoading) {

            let response = await userUpdate({
                ...state.params,
                role_id: state.params.role?.value,
            });

            if (response) {
                setState({saveLoading: false});
                AlertLib.toast({
                    icon: response.status,
                    title: response.description,
                });
                if (response.status === "success") {
                    await reload();
                    onClose();
                }
            }
        }
    };


    const onPasswordEdit = async (e) => {
        setState({saveLoading: true});
        if (!state.saveLoading) {

            let response = await userPasswordUpdate({...state.params});

            if (response) {
                setState({saveLoading: false});
                AlertLib.toast({
                    icon: response.status,
                    title: response.description,
                });
                if (response.status === "success") {
                    await reload();
                    onClose();
                }
            }
        }
    };


    const loadData = async () => {
        setState({loading: true})

        let roleData = await roleList({});

        setState({roles: roleData?.data})

        let response = await userInfo({id: state.params.id});

        if (response) {
            if (response.status === "success" && response.data) {
                setParams({...response.data});
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

    const params = state.params;

    return (
        <div className="container-fluid">

            <div className="row mt-3">
                <div className="col-12">
                    <div className="card text-center">
                        <div className="card-body p-1">

                            <div className="row">
                                <div className="col-2 d-flex align-items-center justify-content-center">
                                    <img
                                        style={{height:'140px'}}
                                        src="/assets/images/users/avatar-03.png"
                                        className="rounded-circle img-fluid img-thumbnail"
                                        alt="profile-image"
                                    />
                                </div>
                                <div className="col-10">
                                    <div className="text-start">
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

                </div>

                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <ul className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                <li className="nav-item">
                                    <a href="#settings" data-bs-toggle="tab" aria-expanded="true"
                                       className="nav-link rounded-0 active">
                                        Settings
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#password" data-bs-toggle="tab" aria-expanded="false"
                                       className="nav-link rounded-0">
                                        Password
                                    </a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                {state.loading && <Loading/>}

                                <div className="tab-pane show active" id="settings">

                                    <h5 className="mb-3 text-uppercase bg-light p-2">
                                        <i className="mdi mdi-account-circle me-1"></i> Personal Info
                                    </h5>

                                    <div className="row">

                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Username</label>
                                            <input
                                                value={state.params.username}
                                                onChange={(e) => setParams({username: e.target.value})}
                                                placeholder='Username'
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Role</label>
                                            <Select
                                                isClearable
                                                options={state.roles?.map((row) => ({
                                                    label: row.title,
                                                    value: row.id,
                                                }))}
                                                value={state.params.role}
                                                onChange={(role) => setParams({role})}
                                                placeholder='Role'
                                                className='form-control'
                                            />
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Name</label>
                                            <input
                                                value={state.params.name}
                                                onChange={(e) => setParams({name: e.target.value})}
                                                placeholder='Name'
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Surname</label>
                                            <input
                                                value={state.params.surname}
                                                onChange={(e) => setParams({surname: e.target.value})}
                                                placeholder='Surname'
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Email</label>
                                            <input
                                                value={state.params.email}
                                                onChange={(e) => setParams({email: e.target.value})}
                                                placeholder='Email'
                                                type='email'
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Phone</label>
                                            <input
                                                value={state.params.phone}
                                                onChange={(e) => setParams({phone: e.target.value})}
                                                placeholder='Phone'
                                                type='phone'
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Address</label>
                                            <input
                                                value={state.params.address}
                                                onChange={(e) => setParams({address: e.target.value})}
                                                placeholder='Address'
                                                type='text'
                                                className="form-control"
                                            />
                                        </div>

                                        <div className="text-end">
                                            <button onClick={onSubmit} className="btn btn-success px-4 mt-3">
                                                {state.saveLoading ? (
                                                    <Spinner color="#fff" style={{width: 30}}/>) : 'Edit'}
                                            </button>
                                        </div>

                                    </div>
                                </div>

                                <div className="tab-pane" id="password">


                                    <h5 className="mb-3 text-uppercase bg-light p-2">
                                        <i className="mdi mdi-key me-1"></i> Change Password
                                    </h5>

                                    <div className="row">

                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Password</label>
                                            <div className="input-group input-group-merge">
                                                <input
                                                    className="form-control"
                                                    type={state.showPassword ? 'text' : 'password'}
                                                    required
                                                    value={state.params.password}
                                                    onChange={e => setParams({password: e.target.value})}
                                                    placeholder='Enter your password'
                                                />
                                                <div
                                                    className={`input-group-text  ${state.showPassword ? 'show-password' : ''}`}
                                                    onClick={() => setState({showPassword: !state.showPassword})}
                                                    data-password="false">
                                                    <span className="password-eye"/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="form-label">Password confirmation</label>
                                            <div className="input-group input-group-merge">
                                                <input
                                                    className="form-control"
                                                    type={state.showPassword ? 'text' : 'password'}
                                                    required
                                                    value={state.params.password_confirmation}
                                                    onChange={e => setParams({password_confirmation: e.target.value})}
                                                    placeholder='Enter your password'
                                                />
                                                <div
                                                    className={`input-group-text  ${state.showPassword ? 'show-password' : ''}`}
                                                    onClick={() => setState({showPassword: !state.showPassword})}
                                                    data-password="false">
                                                    <span className="password-eye"/>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="text-end">
                                            <button onClick={onPasswordEdit} className="btn btn-success px-4 mt-3">
                                                {state.saveLoading ? (
                                                    <Spinner color="#fff" style={{width: 30}}/>) : 'Edit'}
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
});
