import React from "react";

let typingTimeOut = null;
export const InputLazy = ({
  value,
  onChange,
  timeout = 500,
  action = () => {
    console.log("No action passed!");
  },
  className = "form-control form-control-alternative form-control-md",
  placeholder = "Type something...",
  type = "text",
}) => {
  const changeHandler = (e) => {
    let value = e.target.value;
    onChange(value);
    if (typingTimeOut) {
      clearTimeout(typingTimeOut);
    }
    typingTimeOut = setTimeout(() => {
      action(value);
    }, timeout);
  };

  return (
    <input
      {...{ className, type, placeholder, value }}
      onChange={changeHandler}
    />
  );
};

