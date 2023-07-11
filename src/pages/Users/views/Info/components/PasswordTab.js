import React from "react";
import {Loading, Spinner} from "@components";
import {userPasswordUpdate} from "@actions";
import {AlertLib} from "@lib";

export const PasswordTab = React.memo(({state,setParams,setState}) => {

    const onSubmit = async () => {
        setState({saveLoading: true});
        if (!state.saveLoading) {

            let response = await userPasswordUpdate({...state.params});

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
                    <button onClick={onSubmit} className="btn btn-success px-4 mt-3">
                        {state.saveLoading ? (
                            <Spinner color="#fff" style={{width: 30}}/>) : 'Edit'}
                    </button>
                </div>

            </div>

        </div>
    );
});
