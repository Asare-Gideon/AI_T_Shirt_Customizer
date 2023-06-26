import React from "react";
import CustomButton from "./CustomButton";

const AiPicker = ({ generatingImg, handleSubmit, prompt, setPrompt }) => {
  return (
    <div className="aipicker-container">
      <textarea
        placeholder="Ask AI....."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />

      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            title={"Asking Ai....."}
            type={"outline"}
            customStyles={"text-xs"}
          />
        ) : (
          <>
            <CustomButton
              title={"AI Logo"}
              type={"outline"}
              customStyles={"text-xs"}
              handleClick={() => handleSubmit("logo")}
            />
            <CustomButton
              title={"AI Full"}
              type={"filled"}
              customStyles={"text-xs"}
              handleClick={() => handleSubmit("full")}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AiPicker;
