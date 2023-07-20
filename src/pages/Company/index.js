import React, {useReducer, useState} from "react";
import {settingFileDelete, settingFileUpload, settingList, settingUpdate, userAvatarUpload} from "@actions";
import {InputFile, Loading, Spinner} from "@components";
import {AlertLib} from "@lib";

export default function Company(){

    const [loading,setLoding] = useState(true);
    const [saveLoading,setSaveLoading] = useState(false);

    const [state, setState] = useReducer((prevState, newState) => {
        return {...prevState, ...newState}
    }, {
        logo: {},
        title: '',
        email: '',
        address: '',
        description: '',
        map_location: '',
        short_number: '',
        phone: '',
        opening_hours: '',
        reg_id: '',
        social_wp: '',
        social_fb: '',
        social_telegram: '',
        social_instagram: '',
        social_linkedin: '',
        social_twitter: '',
    })



    const loadData = async () => {
        let response = await settingList({});

        if (response) {
            setLoding(false)
            if (response.status === "success") {
                setState(response.data)
            }
        }
    };

    const onSubmit = async (e) => {
        setSaveLoading(true)
        if (!saveLoading) {

            let response = await settingUpdate(state);

            if (response) {
                setSaveLoading(false)
                if (response.status === "success") {
                    AlertLib.toast({
                        icon: response.status,
                        title: response.description,
                    });
                }
            }
        }
    };


    const uploadFile = async (avatar) => {
        let response = await settingFileUpload({file:avatar});

        setState({logo:response.data})

        if (response?.status === "success"){
            AlertLib.toast({
                icon: response?.status,
                title: response?.description,
            });
        }
    };

    const deleteFile = async () => {
        let response = await settingFileDelete({});

        setState({logo:response.data})

        if (response?.status === "success"){
            AlertLib.toast({
                icon: response?.status,
                title: response?.description,
            });
        }
    };

    React.useEffect(() => {
        loadData();
    }, []);

    return(
        <div className="container-fluid">


            <div className="row mt-3">
                <div className="col-12">
                    <div className="card text-center">
                        <div className="card-body">
                            <div className="d-flex align-items-center">

                                <div className="form-group">
                                    <InputFile
                                        size={140}
                                        avatar={state.logo}
                                        uploadFile={uploadFile}
                                        deleteFile={deleteFile}
                                        className="mx-3"
                                    />
                                </div>

                                <div className="text-start me-auto">
                                    <h4 className="font-13 text-uppercase">{state.title}</h4>

                                    <p className="text-muted mb-2 font-13">{state.email}</p>
                                    <p className="text-muted mb-2 font-13">{state.phone}</p>
                                    <p className="text-muted mb-2 font-13">{state.address}</p>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row position-relative">
                {loading && <Loading/>}

                <div className="col-12">
                    <div className="card">
                        <div className="card-body row">
                            <h4 className='header-title mb-3'>Company</h4>

                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        value={state.title}
                                        onChange={(e)=>setState({title:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input
                                        value={state.address}
                                        onChange={(e)=>setState({address:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        value={state.email}
                                        onChange={(e)=>setState({email:e.target.value})}
                                        type="email"
                                        className="form-control"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Location</label>
                                    <input
                                        value={state.map_location}
                                        onChange={(e)=>setState({map_location:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>


                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Short number</label>
                                    <input
                                        value={state.short_number}
                                        onChange={(e)=>setState({short_number:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        value={state.phone}
                                        onChange={(e)=>setState({phone:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Opening hours</label>
                                    <input
                                        value={state.opening_hours}
                                        onChange={(e)=>setState({opening_hours:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Reg Id</label>
                                    <input
                                        value={state.reg_id}
                                        onChange={(e)=>setState({reg_id:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                            </div>


                            <div className="mb-3 col-12">
                                <label className="form-label">description</label>
                                <textarea
                                    value={state.description}
                                    onChange={(e)=>setState({description:e.target.value})}
                                    className="form-control"
                                ></textarea>
                            </div>


                        </div>
                    </div>


                    <div className="card">
                        <div className="card-body row">
                            <h4 className='header-title mb-3'>Social</h4>


                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label className="form-label">WhatsApp</label>
                                    <input
                                        value={state.social_wp}
                                        onChange={(e)=>setState({social_wp:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Facebook</label>
                                    <input
                                        value={state.social_fb}
                                        onChange={(e)=>setState({social_fb:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Telegram</label>
                                    <input
                                        value={state.social_telegram}
                                        onChange={(e)=>setState({social_telegram:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                            </div>

                            <div className="col-md-6">


                                <div className="mb-3">
                                    <label className="form-label">Instagram</label>
                                    <input
                                        value={state.social_instagram}
                                        onChange={(e)=>setState({social_instagram:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Linkedin</label>
                                    <input
                                        value={state.social_linkedin}
                                        onChange={(e)=>setState({social_linkedin:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Twitter</label>
                                    <input
                                        value={state.social_twitter}
                                        onChange={(e)=>setState({social_twitter:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <button
                        className='btn btn-primary px-4'
                        onClick={onSubmit}
                    >
                        {saveLoading ? (<Spinner color="#fff" style={{ width: 30 }} />) : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    )
}
