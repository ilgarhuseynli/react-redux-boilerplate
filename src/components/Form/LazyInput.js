import * as React from "react";
import { Lang } from "@plugins";

let typingTimeOut = null;
export const LazyInput = ({
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
      //Waits if user changes value again
      clearTimeout(typingTimeOut);
    }
    typingTimeOut = setTimeout(() => {
      action(value);
    }, timeout);
  };

  return (
    <input
      className={className}
      type={type}
      placeholder={Lang.get(placeholder)}
      value={value}
      onChange={changeHandler}
    />
  );
};
