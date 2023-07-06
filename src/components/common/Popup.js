import React, {useRef} from "react";

export const Popup = ({
                          show = false,
                          title = "",
                          size = "sm",
                          onClose = () => console.log("No action passed!"),
                          children,
                          header,
                      }) => {

    const modalRef = useRef();

    if (!show) {
        return null;
    }

    return (
        <div onClick={onClose} className="modal fade show" tabIndex="-1">
            <div onClick={e=>e.stopPropagation()} ref={modalRef} className={`modal-dialog modal-${size}`}>
                <div className="modal-content">
                    <div className="modal-header">

                        {header && header}

                        {!header && <div>
                            <h5 className="modal-title">{title}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClose}
                            ></button>
                        </div>}
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
};
