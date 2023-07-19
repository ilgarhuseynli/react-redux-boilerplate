import React, {useState} from "react";
import {settingList, settingUpdate, userStore} from "@actions";
import {Loading, Spinner} from "@components";
import {AlertLib} from "@lib";

export default function Company(){

    const [loading,setLoding] = useState(true);
    const [saveLoading,setSaveLoading] = useState(false);
    const [data,setData] = useState({
        'logo' : '',
        'title' : '',
        'email' : '',
        'address' : '',
        'description' : '',
        'map_location' : '',
        'short_number' : '',
        'phone' : '',
        'opening_hours' : '',
        'reg_id' : '',
        'social_wp' : '',
        'social_fb' : '',
        'social_telegram' : '',
        'social_instagram' : '',
        'social_linkedin' : '',
        'social_twitter' : '',
    });


    const loadData = async () => {
        let response = await settingList({});

        if (response) {
            setLoding(false)
            if (response.status === "success") {
                setData(response.data)
            }
        }
    };

    const onSubmit = async (e) => {
        setSaveLoading(true)
        if (!saveLoading) {

            let response = await settingUpdate(data);

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


    React.useEffect(() => {
        loadData();
    }, []);

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-flex justify-content-between">
                        <h4 className="page-title">Company info</h4>
                        <div className='d-flex align-items-center'>
                            <button
                                className='btn btn-primary px-3'
                                onClick={onSubmit}
                            >
                                {saveLoading ? (<Spinner color="#fff" style={{ width: 30 }} />) : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row position-relative">
                {loading && <Loading/>}

                <div className="col-12">
                    <div className="card">
                        <div className="card-body row">

                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        value={data.title}
                                        onChange={(e)=>setData({...data,title:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input
                                        value={data.address}
                                        onChange={(e)=>setData({...data,address:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        value={data.email}
                                        onChange={(e)=>setData({...data,email:e.target.value})}
                                        type="email"
                                        className="form-control"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Location</label>
                                    <input
                                        value={data.map_location}
                                        onChange={(e)=>setData({...data,map_location:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>


                            </div>

                            <div className="col-md-6">


                                <div className="mb-3">
                                    <label className="form-label">Short number</label>
                                    <input
                                        value={data.short_number}
                                        onChange={(e)=>setData({...data,short_number:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        value={data.phone}
                                        onChange={(e)=>setData({...data,phone:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">Opening hours</label>
                                    <input
                                        value={data.opening_hours}
                                        onChange={(e)=>setData({...data,opening_hours:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Reg Id</label>
                                    <input
                                        value={data.reg_id}
                                        onChange={(e)=>setData({...data,reg_id:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                            </div>


                            <div className="mb-3 col-12">
                                <label className="form-label">description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e)=>setData({...data,description:e.target.value})}
                                    className="form-control"
                                ></textarea>
                            </div>


                        </div>
                    </div>


                    <div className="card">
                        <div className="card-body row">
                            <h4 className='header-title'>Social</h4>


                            <div className="col-md-6">

                                <div className="mb-3">
                                    <label className="form-label">WhatsApp</label>
                                    <input
                                        value={data.social_wp}
                                        onChange={(e)=>setData({...data,social_wp:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Facebook</label>
                                    <input
                                        value={data.social_fb}
                                        onChange={(e)=>setData({...data,social_fb:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Telegram</label>
                                    <input
                                        value={data.social_telegram}
                                        onChange={(e)=>setData({...data,social_telegram:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                            </div>

                            <div className="col-md-6">


                                <div className="mb-3">
                                    <label className="form-label">Instagram</label>
                                    <input
                                        value={data.social_instagram}
                                        onChange={(e)=>setData({...data,social_instagram:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Linkedin</label>
                                    <input
                                        value={data.social_linkedin}
                                        onChange={(e)=>setData({...data,social_linkedin:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Twitter</label>
                                    <input
                                        value={data.social_twitter}
                                        onChange={(e)=>setData({...data,social_twitter:e.target.value})}
                                        type="text"
                                        className="form-control"
                                    />
                                </div>


                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
