import React from "react";
import {Loading, Spinner} from "@components";
import Select from "react-select";
import {userUpdate} from "@actions";
import {AlertLib} from "@lib";
import {AddressList} from "../../../components";

export const InfoTab = React.memo(({state,setParams,setState}) => {

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
            }
        }
    };


    return (
        <div>
            {state.loading && <Loading/>}

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
                        type='phone'
                        className="form-control"
                    />
                </div>

                <div className="col-md-6 mb-2">
                    <AddressList
                        list={state.params.address_list}
                        setAddressList={(data)=>setParams({address_list:data})}
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
    );
});
