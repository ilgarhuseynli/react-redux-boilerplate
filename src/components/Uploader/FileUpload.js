import React from "react";
import classnames from "classnames";
import Progress from "antd/lib/progress";
import {Api, Lang, useToast} from "fogito-core-ui";

export const Uploader = ({
     image,
     addPhoto,
     deletePhoto,
     accept = ".png,.jpg,.jpeg,",
     className = "",
                         }) => {

    const input = React.useRef(null);
    const toast = useToast();

    const [file, setFile] = React.useState({
        loading: false,
        percent: 0,
        id: 0,
    });

    const onDelete = async () => {
        toast.fire({
            position: "center",
            toast: false,
            timer: null,
            title: Lang.get("DeleteAlertTitle"),
            text: Lang.get("DeleteAlertDescription"),
            buttonsStyling: false,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-secondary",
            confirmButtonText: Lang.get("Confirm"),
            cancelButtonText: Lang.get("Cancel"),
        }).then(async (res) => {
            if (res && res.value) {
                deletePhoto();
            }
        });
    };

    const onDrop = (e) => {
        let targetFile = e.target.files[0];
        setFile({
            ...file,
            loading: true,
            percent: 0,
            id: 0,
        });
        let formData = new FormData();
        formData.append("_env", process.env.NODE_ENV);
        formData.append("for", "user");
        formData.append("file", targetFile);
        sendFormData(formData);
    };



    const sendFormData = (data) => {
        let xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", function (e) {
            var percentComplete = (e.loaded / e.total) * 100;
            var percent = Math.round(percentComplete);
            setFile({...file, loading: true, percent});
        });

        xhr.addEventListener("load", function (e) {
            let response = JSON.parse(e.target.response);
            if (response.status === "success") {
                setFile({
                    ...file,
                    loading: false,
                    id: response.data.id,
                });

                addPhoto({...response.data.avatars, id: response.data.id,})
            }
        });

        xhr.open("POST", Api.convert(Api.routes?.filesUpload), true);
        xhr.withCredentials = true;
        xhr.send(data);
    };


    return (
        <div
            className={classnames(
                "form-upload rounded position-relative d-flex align-items-center justify-content-center",
                {
                    [className]: className,
                    loading: file.loading,
                }
            )}
        >
            {file.loading && (
                <Progress
                    className="position-absolute progress-bar"
                    type="circle"
                    width={75}
                    percent={file.percent}
                />
            )}
            {!image ? (
                <>
                    <input
                        ref={input}
                        type="file"
                        accept={accept}
                        className="d-none"
                        onChange={onDrop}
                    />
                    <button
                        className="btn btn-info add_photo"
                        onClick={() => input.current.click()}>
                        <i className="feather feather-plus"></i>
                    </button>
                </>
            ) : (
                <>
                    <img
                        alt="avatar"
                        src={image.medium}
                        className="w-100 h-100"
                    />
                    <input
                        ref={input}
                        type="file"
                        accept={accept}
                        className="d-none"
                        onChange={onDrop}
                    />
                    <div className="actions d-flex justify-content-around position-absolute w-75">
                        <button
                            className="feather feather-camera"
                            onClick={() => input.current.click()}
                        />
                        <button
                            className="feather feather-zoom-in"
                            onClick={() => window.open(image.medium)}
                        />
                        <button className="feather feather-trash-2" onClick={onDelete}/>
                    </div>
                </>
            )}
        </div>
    );
};
