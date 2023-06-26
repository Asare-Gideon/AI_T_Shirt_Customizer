import React, { useRef } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import state from "@/store";

const CameraRig = ({ children }) => {
  const snap = useSnapshot(state);
  const group = useRef();

  useFrame((state, delta) => {
    const isOnBigScreen = window.innerWidth <= 1260;
    const isOnMobileScreen = window.innerWidth <= 600;

    //  set initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isOnBigScreen) targetPosition = [0, 0, 2];
      if (isOnMobileScreen) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isOnMobileScreen) {
        targetPosition = [0, 0, 2.5];
      } else {
        targetPosition = [0, 0, 2];
      }
    }
    //  setting camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // setting model rotation
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
