import React from "react";
import {
    InputCheckbox,
    Loading, Popup, Spinner,
} from "@components";
import {AlertLib, Lang} from "@lib";
import {categoryStore} from "@actions";

export const Add = ({onClose, reload, type}) => {

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({...prevState, ...newState}),
        {
            loading: false,
            showPassword: false,
            saveLoading: false,
            params: {
                title: '',
                status: 1,
                type: type,
            }
        }
    );

    const setParams = (data) => {
        setState({params: {...state.params, ...data}})
    }

    const onSubmit = async (e) => {
        setState({saveLoading: true});
        if (!state.saveLoading) {

            let response = await categoryStore(state.params);

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
            size="md"
            onClose={onClose}
            header={renderModalHeader()}
        >
            {state.loading && <Loading/>}

            <div className="mb-2">
                <label className="form-label">Title</label>
                <input
                    value={state.params.title}
                    onChange={(e) => setParams({title: e.target.value})}
                    placeholder='Title'
                    className="form-control"
                />
            </div>

            <InputCheckbox
                theme="primary"
                label={state.params.status === 1 ? Lang.get("Active") : Lang.get("InActive")}
                checked={!!state.params.status}
                onChange={(e) => setParams({status: e ? 1 : 0})}
                className='d-inline mr-3 mt-3'
            />


        </Popup>
    );
};
