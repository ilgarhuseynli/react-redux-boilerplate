import React, {useEffect} from "react";
import {Popup, Spinner,} from "@components";
import {AlertLib} from "@lib";
import {multiList, orderStore} from "@actions";
import dayjs from 'dayjs';
import {GeneralTab, ItemsTab} from "./components";
import {prepareOrderReq} from "../actions";

export const Add = React.memo(({onClose, reload}) => {

    const [state, setState] = React.useReducer(
        (prevState, newState) => ({...prevState, ...newState}),
        {
            activeTab: 'products',
            loading: true,
            address_list: [],
            showPassword: false,
            saveLoading: false,
            order_statuses : [],
            payment_types : [],
            discount_types : [],
            users : [],
            params: {
                address : '',
                phone : '',
                note : '',
                manager_note : '',
                customer : '',
                payment_type : {label:'Cash',value:1},
                status : {label:'Pending',value:1},
                order_date : dayjs().format('YYYY-MM-DD').toString(),
                items : [],
            }
        }
    );

    const setParams = (data) => {
        setState({params: {...state.params, ...data}})
    }

    const onSubmit = async () => {
        setState({saveLoading: true});
        if (!state.saveLoading) {

            let requestParms = prepareOrderReq(state.params,'add');

            let response = await orderStore(requestParms);

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


    const loadLists = async () => {
        let responseList = await multiList({
            keys:[
                'order_statuses',
                'payment_types',
                'discount_types',
                'products',
                'users',
            ]
        });

        if (responseList?.status === "success"){
            setState({
                loading:false,
                ...responseList.data
            })
        }
    }

    useEffect(()=>{
        loadLists();
    },[])



    const TABS = [
        {
            key:'general',
            title:'General',
            component:<GeneralTab state={state} setParams={setParams} setState={setState}/>,
        },
        {
            key:'products',
            title:'Products',
            component:<ItemsTab state={state} setParams={setParams} setState={setState}/>,
        },
    ]


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
            <div>
                <ul className="nav nav-tabs nav-bordered mb-3">
                    {TABS.map((item,key)=>(
                        <li key={key} onClick={()=>setState({activeTab:item.key})} className="nav-item">
                            <a href={`#${item.key}`} data-bs-toggle="tab" aria-expanded={item.key === state.activeTab}
                               className={`nav-link ${item.key === state.activeTab && 'active'}`}>
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="tab-content position-relative">
                    {TABS.map((item,key)=>(
                        <div key={key} className={`tab-pane ${item.key === state.activeTab && 'show active'}`} id={item.key}>
                            {state.activeTab === item.key && item.component}
                        </div>
                    ))}
                </div>
            </div>
        </Popup>
    );
});
