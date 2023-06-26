import state from "@/store";
import React from "react";
import { getContrastingColor } from "react-color/lib/helpers/color";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";

const CustomButton = ({ title, type, customStyles, handleClick }) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else {
      return {
        backgroundColor: "transparent",
        borderWidth: "1.4px",
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };
  return (
    <button
      onClick={handleClick}
      style={generateStyle(type)}
      className={twMerge(
        "px-4 py-2  flex-1 rounded-md outline-none",
        customStyles
      )}
    >
      {title}
    </button>
  );
};

export default CustomButton;
