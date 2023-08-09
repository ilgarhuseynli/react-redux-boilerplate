import React from "react";
import {Lang} from "@lib";

export const AddressList = ({ list, setAddressList}) => {

    const setAddress = (index, data) => {
        list[index] = data;
        setAddressList(list)
    }

    const addNew = (index = 0) => {
        list.splice(index, 0, '');
        setAddressList(list)
    }

    const deleteAddress = (index) => {
        list.splice(index, 1);
        setAddressList(list)
    }

    console.log(list.length)
    return (
        <div>

            {list.length === 0 && <>
                <label className="form-label">Address List</label>
                <div>
                    <button
                        onClick={() => addNew()}
                        type="button"
                        className="rounded-circle cursor-pointer btn-primary text-white d-flex align-items-center justify-content-center"
                        style={{width: '35px', height: '35px'}}
                    >
                        <i className="uil-plus fs-16"></i>
                    </button>
                </div>
            </>}




            {list.length > 0 && list.map((currentAddress, key) => {

                return (
                    <div key={key}>
                        <label className='form-label'>{Lang.get("Address")} ({key + 1})</label>

                        <div className='d-flex align-items-baseline mb-2'>

                            <input
                                value={currentAddress}
                                onChange={(e) => setAddress(key,e.target.value)}
                                placeholder={'Address'+ (key + 1)}
                                type='text'
                                className="form-control"
                            />

                            <button
                                className="btn btn-danger ms-2"
                                type="button"
                                onClick={()=>deleteAddress(key)}
                            >
                                <i className="uil-trash"></i>
                            </button>

                            <button
                                className="btn btn-primary ms-2"
                                type="button"
                                onClick={()=>addNew(key + 1)}
                            >
                                <i className="uil-plus"></i>
                            </button>

                        </div>
                    </div>
                )
            })}

        </div>
    )
}
