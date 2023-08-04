import React from "react";
import classNames from "classnames";
import Progress from "antd/lib/progress";
import { useDropzone } from "react-dropzone";
import {API_ROUTES} from "@config/routes";
import AxiosClient from "../../library/AxiosClient";

export const InputFile = ({
  size = 180,
  avatar,
  disabled,
  className,
  uploadFile,
  deleteFile,
}) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    disabled,
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    accept: "image/jpeg,image/jpg,image/png",
    onDrop: (files) => onDrop(files),
  });
  const [state, setState] = React.useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      loading: false,
      percent: 0,
      url: null,
    }
  );

  const onDrop = async (files) => {
    const file = files[0];

    setState({
      loading: true,
      url: URL.createObjectURL(file),
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("for", "user");

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        setState({ percent: Math.round((e.loaded / e.total) * 100) });
      }
    }

    let response = await AxiosClient.post(API_ROUTES.mediaUpload, formData ,config).catch(err => err.response)

    if (response) {
      setState({ loading: false, percent: 0 });
      if (response.status === "success") {

        uploadFile(response.data)

      } else {
        setState({ url: null });
      }
    }
  };




  React.useEffect(() => {
    setState({ url: avatar?.medium });
  }, [avatar]);

  return (
    <div
      className={classNames(
        "form-control-file position-relative rounded-circle d-flex flex-shrink-0 justify-content-center align-items-center",
        { [className]: className, loading: state.loading, disabled }
      )}
      style={{ width: size, height: size }}
    >
      <img
        alt="preview"
        src={state?.url || "/assets/images/noimg-item.png"}
        className="w-100 h-100"
      />
      {state.loading && (
        <Progress type="circle" percent={state.percent} width={size * 0.5} />
      )}
      {!disabled && !state.loading && (
        <div
          {...getRootProps({ className: "actions position-absolute d-flex" })}
        >
          <input {...getInputProps()} />
          <button
            type="button"
            className="uil uil-camera"
            onClick={open}
          />
          {!!avatar?.id && (
            <>
              <a
                target="_blank"
                href={avatar.url}
                rel="noopener nofollow noredirect"
              >
                <i className='uil uil-search-plus'></i>
              </a>
              <button
                type="button"
                className="uil uil-trash"
                onClick={deleteFile}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
