import state from "@/store";
import React from "react";
import { useSnapshot } from "valtio";
import CustomButton from "./CustomButton";

const FilePicker = ({ file, setFile, readFile }) => {
  const snap = useSnapshot(state);

  return (
    <div className="filepicker-container">
      <div className="flex flex-1 flex-col">
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload file
        </label>
        <p className="mt-3 text-gray-500 truncate">
          {file == "" ? "No file Selected" : file.name}
        </p>
      </div>
      <div className="flex flex-wrap mt-4 gap-3">
        <CustomButton
          title={"Logo"}
          type={"outline"}
          handleClick={() => readFile("logo")}
        />
        <CustomButton
          title={"Full"}
          type={"filled"}
          handleClick={() => readFile("full")}
          customStyles={"text-xs"}
        />
      </div>
    </div>
  );
};

export default FilePicker;
