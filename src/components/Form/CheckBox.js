import React from "react";

export const Checkbox = ({
  label = null,
  checked = false,
  onChange,
  disabled = false,
  style,
}) => {
  return (
    <button
      type="button"
      className="checkbox-custom-container d-flex align-items-center"
      onClick={() => {
        if (!disabled) {
          onChange(!checked);
        }
      }}
    >
      <div
        style={style}
        className={`checkbox-custom d-flex align-items-center justify-content-center${
          checked ? " checked" : ""
        }${disabled ? " disabled" : ""}`}
      >
        {checked && <i className="feather feather-check" />}
      </div>
      {label && (
        <label className="form-control-label mb-0 ml-2 text-muted">
          {label}
        </label>
      )}
    </button>
  );
};
