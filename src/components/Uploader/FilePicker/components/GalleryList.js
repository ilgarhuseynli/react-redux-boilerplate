import React, {useEffect, useState} from "react";
import {Api, AppContext, ErrorBoundary, Lang, Popup, useToast} from "fogito-core-ui";
import Progress from "antd/lib/progress";
import {useDropzone} from "react-dropzone";
import {galleryAdd, galleryList} from "@actions";
import {SkletonLoader} from "./SkletonLoader";

let xhr = [];
export const GalleryList = ({
                        from,
                        fromId,
                        files,
                        setFiles,
                        photo,
                        togglePhoto,
                        onClose
}) => {

    const toast = useToast();
    const {setProps, props} = React.useContext(AppContext);
    const [photos,setPhotos] = useState(files ?? [])
    const [loading, setLoading] = React.useState(false);

    const {getInputProps, open} = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDrop: (items) => onUpload(items),
    });

    const loadData = async ()=>{
        setLoading(true)
        let response = await galleryList({
            from_id: fromId
        });
        if (response.status === "success") {
            setPhotos(response.data)
            setLoading(false)
        }else{
            toast.fire({
                icon: response.status,
                title: response.description,
            });
        }
    }

    useEffect(()=>{
        if (fromId){
            loadData()
        }
    },[])

    const onUpload = React.useCallback(
        async (items) => {
            return Promise.all(
                items.map((file) => new Promise((resolve) => {
                        let key = file.lastModified;

                        photos.unshift({
                            key,
                            percent: 0,
                            loading: true,
                        });
                        setPhotos(photos);
                        setProps({check_attachments_finish: 'loading'});

                        let formData = new FormData();
                        formData.append("for", "user");
                        formData.append("file", file);

                        xhr[key] = new XMLHttpRequest();
                        xhr[key].upload.addEventListener("progress", (e) => {
                            var percent = Math.round((e.loaded / e.total) * 100);
                            setPhotos(
                                photos.map((item) => {
                                    if (item.key === key) {
                                        item.percent = percent;
                                    }
                                    return item;
                                })
                            );
                        });

                        xhr[key].addEventListener("load", (e) => {
                            let response = JSON.parse(e.target.responseText);
                            if (response.status === "success") {
                                resolve(response.data);
                            } else {
                                resolve(response.data);

                                setPhotos(photos.filter((item) => item.key !== key));

                                if (xhr[key]) {
                                    xhr[key].abort();
                                }

                                toast.fire({
                                    icon: "error",
                                    title: response.description,
                                });
                                setProps({check_attachments_finish: 'ready'});
                            }
                        });

                        xhr[key].open("POST", Api.convert(Api.routes?.filesUpload, true));
                        xhr[key].withCredentials = true;
                        xhr[key].send(formData);
                    })
                ))
                .then((response) => {
                    let accepted = response.filter((row) => row);
                    if (accepted.length) {
                        if (fromId) {
                            uploadFile(accepted)
                        } else {
                            let arr = [];
                            arr.push(accepted);
                            setPhotos([...arr[0], ...photos.filter((item) => !item.key)]);
                            setProps({check_attachments_finish: 'ready'});
                        }
                    }
                });
        },
        [photos]
    );


    const uploadFile = async (attachments) => {
        let response = await galleryAdd({
            from: from,
            from_id: fromId,
            files: attachments?.map((x) => ({id: x.id})),
        });

        if (response?.status === "success" && response.data) {
            let arr = [];
            arr.push(response.data);
            setPhotos([...arr[0], ...photos.filter((item) => item.percent !== 100)]);
        } else {
            setPhotos(photos.filter((item) => item.percent !== 100));
            toast.fire({
                icon: "error",
                title: response?.description,
            });
        }
        setProps({check_attachments_finish: 'ready'});
    };


    const goBack = () => {
        if (props?.check_attachments_finish !== 'ready') {
            toast.fire({
                icon: 'error',
                title: Lang.get('PleaseWaitForAttachmentsToComplete'),
            });
            return;
        }

        onClose();
    }

    const onPaste = (e) => {
        let length = e.clipboardData.files.length;
        if (length) {
            let items = [];
            for (let i = 0; i < length; i++) {
                items.push(e.clipboardData.files[i]);
            }
            onUpload(items);
        }
    };

    React.useEffect(() => {
        setFiles && setFiles(photos)
    }, [photos]);

    React.useEffect(() => {
        window.addEventListener("paste", onPaste);
        return () => {
            window.removeEventListener("paste", onPaste);
        };
    }, [onUpload]);

    return (
        <ErrorBoundary>
            <Popup
                size="md"
                show={true}
                title={Lang.get('Gallery')}
                onClose={goBack}
            >
                <div style={{height: '50vh', overflowY: 'auto',}}>

                    {loading && <SkletonLoader />}

                    <div className="file__picker-gallery">
                        {photos.length > 0 && photos.map((file, key) => (
                            <div
                                className="file__picker-gallery-item mt-1"
                                key={key}
                                onClick={() => {
                                    if (file.id === photo?.id) {
                                        togglePhoto()
                                    } else {
                                        togglePhoto(file)
                                    }
                                }}
                            >
                                {file.loading ? (
                                    <Progress
                                        className="position-absolute"
                                        type="circle"
                                        width={75}
                                        percent={file.percent}
                                    />
                                ) : (
                                    <div className='img'>
                                        <img src={file.avatars.small} alt=""/>
                                        {photo?.id === file.id && (
                                            <div className="icon">
                                                <div className="bg-success rounded h-auto lh-10 p-1 mb-2 mb-lg-0">
                                                    <i className="feather feather-check"/>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {!loading && <div className="file__picker-gallery-item mt-1">
                            <input {...getInputProps()} />
                            <button
                                className="btn"
                                type="button"
                                onClick={open}
                            >
                                <i className="feather feather-plus"/>
                            </button>
                        </div> }
                    </div>

                </div>
            </Popup>
        </ErrorBoundary>
    )
}
