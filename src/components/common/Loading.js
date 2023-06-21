import React from "react";
import { WaveLoading } from "respinner";

export const Loading = React.memo(
  ({
    duration = 1.5,
    stroke = "#ffffff",
    opacity = 0.8,
    strokeWidth = 2.5,
    size = 40,
    bgStyle = {
      backgroundColor: "rgba(211,247,255,0.77)",
      borderRadius: "calc(0.375rem - 1px)",
    },
    bgClass = false,
    ...props
  }) => {
    let bgProps = {
      className: `loading-container ${bgClass ? bgClass : ``}`,
      style: bgStyle ? bgStyle : {},
    };

    return (
      <div {...bgProps}>
        <WaveLoading
          className="loading-spinner"
          duration={duration}
          stroke={stroke}
          strokeWidth={strokeWidth}
          opacity={opacity}
          size={size}
          {...props}
        />
      </div>
    );
  }
);
