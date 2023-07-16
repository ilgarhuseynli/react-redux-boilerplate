import React from "react";
import {ErrorBoundary, Lang, useModal, useToast} from "fogito-core-ui";
import {GalleryList} from "./components";

export const FilePicker = ({
                               photo,
                               togglePhoto,
                               from = 'products',
                               fromId = false,
                               files = false,
                               setFiles = false,
                           }) => {

    const toast = useToast();
    const modal = useModal();

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
                togglePhoto();
            }
        });
    };

    return (
        <ErrorBoundary>
            {modal.modals.includes('gallery_photos') && (
                <GalleryList
                    from={from}
                    fromId={fromId}
                    files={files}
                    setFiles={setFiles}

                    photo={photo}
                    togglePhoto={togglePhoto}
                    onClose={() => modal.hide('gallery_photos')}
                />
            )}

            <div className="file__picker rounded">
                {!photo ? (
                    <button
                        className="btn btn-info add_photo"
                        onClick={() => modal.show('gallery_photos')}
                    >
                        <i className="feather feather-plus"></i>
                    </button>
                ) : (
                    <>
                        <img
                            alt="avatar"
                            src={photo.avatars.medium}
                            className="w-100 h-100"
                        />
                        <div className="actions">
                            <button
                                className="feather feather-edit"
                                onClick={() => modal.show('gallery_photos')}
                            />
                            <button
                                className="feather feather-zoom-in"
                                onClick={() => window.open(photo.file)}
                            />
                            <button className="feather feather-trash-2" onClick={onDelete}/>
                        </div>
                    </>
                )}
            </div>

        </ErrorBoundary>
    );
};
