"use client";

import { useEffect } from "react";
import { layerAnimation } from "../_animations/authAnimation";
import { useAnimate } from "framer-motion";
import MotionComponent from "./MotionComponent";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";
import illustration from "@/public/authIllustration.jpg";

function AuthRightSide() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    layerAnimation(animate);
  }, [animate]);
  return (
    <aside
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-white"
      ref={scope}
    >
      <MotionComponent
        className="bg-brand-500 grid h-20 w-20 grid-rows-[1fr_38rem] rounded-full"
        initial={{ y: -500 }}
        id="secondLayer"
      >
        <div className="absolute z-10">
          <MotionComponent
            className="h-32 w-[300rem] -rotate-45 bg-gray-900"
            id="line1"
          />
          <MotionComponent
            className="h-32 w-[300rem] -rotate-45 bg-gray-900"
            id="line2"
          />
          <MotionComponent
            className="h-32 w-[300rem] -rotate-45 bg-gray-900"
            id="line3"
          />
        </div>

        <div className="absolute top-0 left-0 z-20 h-72 w-80 -rotate-45 overflow-hidden">
          <MotionComponent
            className="hidden h-full w-full translate-x-[100%] items-center gap-80"
            id="headingSlider"
          >
            <h2 className="flex min-w-full justify-end text-3xl font-medium text-white">
              SKETCH IT OUT
            </h2>
            <h2 className="flex min-w-full justify-end text-3xl font-medium text-white">
              USER FLOW
            </h2>
            <h2 className="flex min-w-full justify-end text-3xl font-medium text-white">
              DESIGN
            </h2>
          </MotionComponent>
        </div>

        <MotionComponent
          className="relative hidden"
          initial={{ y: -500 }}
          id="illustration"
        >
          <Image
            src={illustration}
            alt="illustration"
            fill
            className="object-cover object-[0%_25%]"
          />
        </MotionComponent>

        <MotionComponent
          className="hidden w-full translate-x-[100%] gap-[100%]"
          id="videoSlider"
        >
          <VideoPlayer videoURL="/sketchItOut.mp4" />

          <VideoPlayer videoURL="/userFlow.mp4" />

          <VideoPlayer videoURL="/design.mp4" />
        </MotionComponent>
      </MotionComponent>
    </aside>
  );
}

export default AuthRightSide;
