import React from "react";
import classNames from "classnames";

export const InputCheckbox = ({
  label = null,
  checked = false,
  onChange,
  disabled = false,
  theme = "primary",
  className = "",
  style,
}) => {
  return (
    <button
      type="button"
      className={classNames("form-check d-flex align-items-center p-0", {
        [className]: className,
      })}
      onClick={() => {
        if (!disabled) {
          onChange(!checked);
        }
      }}
    >
      <div
        style={style}
        className={classNames(
          "checkbox d-flex align-items-center justify-content-center",
          {
            "bg-primary": theme === "primary" && checked,
            "bg-success": theme === "success" && checked,
            "bg-white": !checked,
            disabled,
          }
        )}
      >
        {checked && (
          <i className="uil-check font-weight-bold text-white" />
        )}
      </div>
      {label && (
        <label className="form-control-label mb-0 ml-2 text-muted ms-1">
          {label}
        </label>
      )}
    </button>
  );
};
