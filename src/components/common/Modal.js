import React from "react";
import classNames from "classnames";

export const Modal = React.forwardRef(
  ({ className, children, show, ...props }, ref) => {
    const timeout = React.useRef(null);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      if (show) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      timeout.current = setTimeout(() => {
        setVisible(show);
      }, 10);

      return () => clearTimeout(timeout.current);
    }, [show]);

    if (!show) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={classNames("frame__modal", className, {
          show: visible,
        })}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Modal.Header = React.forwardRef(
  ({ className, children, onClose = () => true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          "frame__modal-header position-relative",
          className
        )}
        {...props}
      >
        <button
          type="button"
          className="frame__modal-header-close"
          onClick={onClose}
        >
          <i className="feather feather-chevron-left" />
        </button>
        <div className="frame__modal-header-content d-flex align-items-center ml-3">
          {children}
        </div>
      </div>
    );
  }
);

Modal.Body = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={classNames("frame__modal-body", className)}
      {...props}
    >
      {children}
    </div>
  );
});

export const Popup = ({
  show = false,
  title = "",
  size = "sm",
  onClose = () => console.log("No action passed!"),
  children,
}) => {
  if (!show) return null;

  return (
    <div className="frame__dialog-backdrop" onClick={onClose}>
      <div
        className={classNames(
          "dialog position-relative rounded bg-white mx-auto my-md-5 my-2 px-0 col-11",
          {
            "col-lg-9 col-md-10 col-sm-11": size === "lg",
            "col-lg-6 col-md-7 col-sm-8": size === "md",
            "col-lg-3 col-md-4 col-sm-5": size === "sm",
          }
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="head rounded-top">
          <h4 className="title mb-0">{title}</h4>
        </div>
        <div className="body rounded-bottom">{children}</div>
      </div>
    </div>
  );
};
