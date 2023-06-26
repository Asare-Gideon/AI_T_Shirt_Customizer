import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../../config/motion";
import state from "@/store";
import CustomButton from "@/components/CustomButton";

const HomeContent = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <Image src={"/threejs.png"} width={60} height={60} />
          </motion.header>

          <motion.div
            className="home-content"
            {...headContainerAnimation}
          ></motion.div>
          <motion.div {...headTextAnimation}>
            <h2 className="head-text">
              Let's <br className="hidden xl:block" /> Do it.
            </h2>
          </motion.div>
          <motion.div {...headContentAnimation} className="flex flex-col gap-5">
            <p className="max-w-md font-normal text-gray-600 ">
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Uleash your imagination</strong> and
              define your own style.
            </p>
            <CustomButton
              type="filled"
              title="Customize it"
              handleClick={() => (state.intro = false)}
              customStyles="w-fit px-4 font-bold text-sm"
            />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default HomeContent;
