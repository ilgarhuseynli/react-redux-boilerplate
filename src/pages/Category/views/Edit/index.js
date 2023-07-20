import React from "react";
import {
    InputCheckbox,
    Loading, Popup, Spinner,
} from "@components";
import {AlertLib, Lang} from "@lib";
import {categoryInfo, categoryUpdate} from "@actions";
import {useParams} from "react-router-dom";

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
                title: '',
                status: 1,
            }
        }
    );

    const setParams = (data) => {
        setState({params: {...state.params, ...data}})
    }

    const onSubmit = async (e) => {
        setState({saveLoading: true});
        if (!state.saveLoading) {

            let response = await categoryUpdate(state.params);

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


    const loadData = async () => {
        setState({loading: true})

        let response = await categoryInfo({id: state.params.id});

        if (response) {
            if (response.status === "success" && response.data) {
                setParams(response.data);
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
            size="md"
            onClose={onClose}
            header={renderModalHeader()}
        >
            {state.loading && <Loading/>}

            <div className="col-12 mb-2">
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
                onChange={(e) => setParams({status: e ? 1 : 0,})}
                className='d-inline mr-3 mt-3'
            />

        </Popup>
    );
});
