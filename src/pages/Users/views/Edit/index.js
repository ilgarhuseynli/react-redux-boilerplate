import React from "react";
import {
    Loading, Popup, Spinner,
} from "@components";
import {AlertLib} from "@lib";
import {userInfo, userUpdate} from "@actions";
import {useParams} from "react-router-dom";
import {roleList} from "../../../../actions/roles";
import Select from "react-select";

export const Edit = React.memo(({onClose, reload}) => {

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
                role_id:state.params.role?.value,
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


    const renderModalHeader = () => (
        <div className="d-flex justify-content-between align-items-center w-100">
            <div>
                <button
                    onClick={onClose}
                    className="btn btn-primary btn-block"
                >
                    <i className="uil-angle-left"/>
                </button>
            </div>
            <h5 className="title fs-16">Edit</h5>
            <div>
                <button onClick={onSubmit} className="btn btn-primary px-4">
                    {state.saveLoading ? (<Spinner color="#fff" style={{ width: 30 }} />) : 'Edit'}
                </button>
            </div>
        </div>
    )

    return (
        <Popup
            show={true}
            size="lg"
            onClose={onClose}
            header={renderModalHeader()}
        >
            {state.loading && <Loading/>}

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

                <div className="col-12"></div>

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
                        <div className={`input-group-text  ${state.showPassword ? 'show-password' : ''}`}
                             onClick={() => setState({showPassword: !state.showPassword})} data-password="false">
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
                        <div className={`input-group-text  ${state.showPassword ? 'show-password' : ''}`}
                             onClick={() => setState({showPassword: !state.showPassword})} data-password="false">
                            <span className="password-eye"/>
                        </div>
                    </div>
                </div>

            </div>
        </Popup>
    );
});
