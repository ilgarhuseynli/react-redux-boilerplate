import React, {useState} from "react";
import {InputCheckbox} from "@components";
import {permissionsUpdate} from "@actions";
import {AlertLib} from "@lib";

export const PermissionsSection = React.memo(({userId, data}) => {

    const [saveLoading, setSaveLoading] = useState(false);

    const onSubmit = async (updateData, locked = true) => {
        setSaveLoading(true)
        if (!saveLoading) {

            let response = await permissionsUpdate({
                ...updateData,
                locked: locked,
                user_id: userId,
            });

            if (response.status === 'success') {
                data.permissions[updateData.value] = response.data;

                AlertLib.toast({
                    icon: response.status,
                    title: response.description,
                });
            }

            setSaveLoading(false)
        }
    };


    return (
        <div className='row'>
            <h5 className='mx-2'>{data.title}</h5>
            {Object.keys(data.permissions).map((permKey) => {
                let currentPerm = data.permissions[permKey];

                return (
                    <div className="col-lg-3">
                        <div className="card p-2">
                            <div className="d-flex justify-content-between align-items-center">

                                <InputCheckbox
                                    theme="primary"
                                    label={currentPerm.title}
                                    checked={currentPerm.allow}
                                    onChange={() => onSubmit({...currentPerm, allow: !currentPerm.allow})}
                                />

                                <i
                                    style={{cursor: "pointer"}}
                                    onClick={() => onSubmit({...currentPerm}, !currentPerm.locked)}
                                    className={` ${currentPerm.locked ? 'uil-lock text-danger' : 'uil-unlock'} fs-3`}
                                />

                            </div>

                            {currentPerm.variants && <div>

                                <span>Permissions</span>

                                {currentPerm.variants.map(option =>(
                                    <InputCheckbox
                                        className='my-2'
                                        theme="primary"
                                        label={option}
                                        checked={currentPerm.allow === option}
                                        onChange={() => onSubmit({...currentPerm, allow: option})}
                                    />
                                ))}
                            </div>}
                        </div>
                    </div>
                )

            })}
        </div>
    );
});
