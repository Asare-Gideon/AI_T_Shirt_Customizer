import state from "@/store";
import Image from "next/image";
import React from "react";
import { useSnapshot } from "valtio";

const Tab = ({ isFilterTab, isActiveTab, tab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyle =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: "transparent", opacity: 1 };

  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassmorhism" : "rounded-md"
      }`}
      onClick={handleClick}
      style={activeStyle}
    >
      <Image src={tab.icon} alt="icon" height={40} width={40} />
    </div>
  );
};

export default Tab;
