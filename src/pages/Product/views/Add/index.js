import React, {useEffect} from "react";
import {
    InputCheckbox,
    Loading, Popup, Spinner,
} from "@components";
import {AlertLib, Lang, Parameters} from "@lib";
import {productStore,multiList} from "@actions";
import AsyncSelect from "react-select/async";
import Select from "react-select";

export const Add = React.memo(({onClose, reload}) => {

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({...prevState, ...newState}),
        {
            loading: true,
            showPassword: false,
            saveLoading: false,
            categories: [],
            params: {
                title : '',
                slug : '',
                sku : '',
                description : '',
                category : '',
                position : 0,
                status : 1,
                price : 0,
            }
        }
    );

    const setParams = (data) => {
        setState({params: {...state.params, ...data}})
    }

    const onSubmit = async (e) => {
        setState({saveLoading: true});
        if (!state.saveLoading) {

            let response = await productStore({
                ...state.params,
                position:state.params.position?.value,
                category_id:state.params.category?.value,
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

    const loadMinList = async (title, key) => {
        let response = await multiList({filters: {query: title}, key});
        if (response?.status === "success") {
            return response.data;
        }
    };

    const loadData = async () => {
        let response = await multiList({key:'product_categories'});
        if (response?.status === "success"){
            setState({ loading:false, categories:response.data})
        }
    }

    useEffect(()=>{
        loadData();
    },[])


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
            size="lg"
            onClose={onClose}
            header={renderModalHeader()}
        >
            <div className="row">

                <div className="col-md-6 mb-2">
                    <label className="form-label">Title</label>
                    <input
                        value={state.params.title}
                        onChange={(e) => setParams({title: e.target.value})}
                        placeholder='Title'
                        className="form-control"
                    />
                </div>

                <div className="col-md-6 mb-2">
                    <label className="form-label">Sku</label>
                    <input
                        value={state.params.sku}
                        onChange={(e) => setParams({sku: e.target.value})}
                        placeholder='sku'
                        className="form-control"
                    />
                </div>

                <div className="col-md-6 mb-2">
                    <label className="form-label">Price</label>
                    <input
                        type='number'
                        step='2'
                        min='0'
                        value={state.params.price}
                        onChange={(e) => setParams({price: e.target.value})}
                        placeholder='Price'
                        className="form-control"
                    />
                </div>

                <div className="col-md-6 mb-2">
                    <label className="form-label">Category</label>
                    <AsyncSelect
                        isClearable
                        cacheOptions
                        loadOptions={(title) => loadMinList(title, 'product_categories')}
                        defaultOptions={state.categories}
                        value={state.params.category}
                        onChange={(category) => setParams({category})}
                        placeholder='Category'
                        className='form-control'
                        isLoading={state.loading}
                    />
                </div>


                <div className="col-md-6 mb-2">
                    <label className="form-label">Position</label>
                    <Select
                        isClearable
                        options={Parameters.productPositions()}
                        value={state.params.position}
                        onChange={(position) => setParams({position})}
                        placeholder='Position'
                        className='form-control'
                    />
                </div>




                <div className="col-12 mb-2">
                    <label className="form-label">Description</label>
                    <textarea
                        value={state.params.description}
                        onChange={(e) => setParams({description: e.target.value})}
                        placeholder='Description'
                        className="form-control"
                    />
                </div>



                <div className="col-12">
                    <InputCheckbox
                        theme="primary"
                        label={state.params.status === 1 ? Lang.get("Active") : Lang.get("InActive")}
                        checked={!!state.params.status}
                        onChange={(e) => setParams({status: e ? 1 : 0})}
                        className='d-inline mt-2 float-end'
                    />
                </div>

            </div>
        </Popup>
    );
});
