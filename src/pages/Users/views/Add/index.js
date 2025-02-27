import React from "react";
import {
    Loading, Popup, Spinner,
} from "@components";
import {AlertLib} from "@lib";
import {userStore} from "@actions";
import {AddressList} from "../../components";

export const Add = React.memo(({onClose, reload, role}) => {

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({...prevState, ...newState}),
        {
            loading: false,
            showPassword: false,
            saveLoading: false,
            params: {
                name: '',
                role: role,
                surname: '',
                phone: '',
                address_list: [],
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

            let response = await userStore({
                ...state.params,
                role_id:state.params.role,
            });

            if (response) {
                setState({saveLoading: false});
                if (response.status === "success") {
                    AlertLib.toast({
                        icon: response.status,
                        title: response.description,
                    });

                    await reload();
                    onClose();
                }
            }
        }
    };


    // const loadData = async () => {
    //     let response = await parameters({name:'roles'});
    //
    //     setState({roles: response?.data})
    // };


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
            <h5 className="title fs-16">Add</h5>
            <div>
                <button onClick={onSubmit} className="btn btn-primary px-4">
                    {state.saveLoading ? (<Spinner color="#fff" style={{ width: 30 }} />) : 'Save'}
                </button>
            </div>
        </div>
    )

    return (
        <Popup
            show={true}
            size="xl"
            onClose={onClose}
            header={renderModalHeader()}
        >
            {state.loading && <Loading/>}

            <div className="row">

                {/*<div className="col-md-6 mb-2">*/}
                {/*    <label className="form-label">Role</label>*/}
                {/*    <Select*/}
                {/*        isClearable*/}
                {/*        options={state.roles}*/}
                {/*        value={state.params.role}*/}
                {/*        onChange={(role) => setParams({role})}*/}
                {/*        placeholder='Role'*/}
                {/*        className='form-control'*/}
                {/*    />*/}
                {/*</div>*/}

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
                        type='number'
                        className="form-control"
                    />
                </div>

                <div className="col-md-6 mb-2">
                    <AddressList
                        list={state.params.address_list}
                        setAddressList={(data)=>setParams({address_list:data})}
                    />
                </div>

                <div className="col-12">
                    {/*hidden input. auto fill email problem*/}
                    <input style={{opacity:0}} type='text'/>
                </div>


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
