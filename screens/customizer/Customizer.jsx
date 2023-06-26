import React, { useEffect, useState } from "react";
import { snapshot, useSnapshot } from "valtio";
import { motion, AnimatePresence } from "framer-motion";
import config from "@/config/config";
import state from "@/store";
import { downloadCanvasToImage, reader } from "@/config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "@/config/constants";
import { fadeAnimation, slideAnimation } from "@/config/motion";
import Tab from "@/components/Tab";
import CustomButton from "@/components/CustomButton";
import ColorPicker from "@/components/ColorPicker";
import FilePicker from "@/components/FilePicker";
import AiPicker from "@/components/AiPicker";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const handleActiveFilterTab = (tabname) => {
    switch (tabname) {
      case "logoShirt":
        state.isLogoTexture = !state.isLogoTexture;
        setActiveFilterTab({
          ...activeFilterTab,
          logoShirt: !snap.isLogoTexture,
        });
        break;
      case "stylishShirt":
        state.isFullTexture = !state.isFullTexture;
        setActiveFilterTab({
          ...activeFilterTab,
          stylishShirt: snap.isLogoTexture,
        });
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
    }
  };

  const handleDecal = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };
  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecal(type, result);
      setActiveEditorTab(false);
    });
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Enter a prompt");

    try {
      setGeneratingImg(true);
      const respond = await fetch("http://localhost:5000/app/v1/delle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await respond.json();
      // handleDecal(type, `data:image/png;base64,${data.photo}`);
      console.log(data);
    } catch (err) {
      alert(err);
      console.log(err);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AiPicker
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
            prompt={prompt}
            setPrompt={setPrompt}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute bottom-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs ">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.dv className="absolute right-5 top-5 z-10" {...fadeAnimation}>
            <CustomButton
              title="Go Back"
              type={"filled"}
              handleClick={() => (state.intro = true)}
              customStyles={"w-fit px-4 font-bold text-sm"}
            />
          </motion.dv>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
