"use client";

type Animate = typeof import("framer-motion").animate;

export async function layerAnimation(animate: Animate) {
  await animate(
    "#secondLayer",
    { y: 0 },
    {
      duration: 0.5,
      ease: "easeInOut",
    },
  );

  animate(
    "#secondLayer",
    { scaleY: 0.6, scaleX: 1.4 },
    {
      duration: 0.1,
      stiffness: 200,
      type: "spring",
    },
  );

  await animate(
    "#secondLayer",
    { y: -300, scaleY: 1.2, scaleX: 0.8 },
    {
      duration: 0.6,
      ease: "easeInOut",
    },
  );

  animate(
    "#secondLayer",
    { scaleY: 1, scaleX: 1 },
    {
      duration: 0.1,
      stiffness: 200,
      type: "spring",
    },
  );

  await animate(
    "#secondLayer",
    { y: 0 },
    {
      duration: 1,
      ease: "easeInOut",
    },
  );

  animate(
    "#secondLayer",
    { scaleY: 0.8, scaleX: 1.2 },
    {
      duration: 0.1,
      stiffness: 200,
      type: "spring",
    },
  );

  await animate(
    "#secondLayer",
    { y: 0 },
    {
      duration: 0.5,
      ease: "easeInOut",
    },
  );

  animate(
    "#secondLayer",
    { scaleY: 0.6, scaleX: 1.4 },
    {
      duration: 0.1,
      stiffness: 200,
      type: "spring",
    },
  );

  await animate(
    "#secondLayer",
    { y: -200, scaleY: 1.2, scaleX: 0.8 },
    {
      duration: 0.6,
      ease: "easeInOut",
    },
  );

  animate(
    "#secondLayer",
    { scaleY: 1, scaleX: 1 },
    {
      duration: 0.1,
      stiffness: 200,
      type: "spring",
    },
  );

  await animate(
    "#secondLayer",
    { y: 0 },
    {
      duration: 1,
      ease: "easeInOut",
    },
  );

  await animate(
    "#secondLayer",
    { scale: 20 },
    {
      duration: 0.5,
    },
  );

  animate(
    "#secondLayer",
    { scale: 1, height: "100%", width: "100%", borderRadius: 0 },
    {
      duration: 0,
    },
  );

  animate("#line1", { x: -1710, y: -1710 }, { duration: 0.5 });
  animate("#line2", { x: -1710, y: -1710 }, { duration: 0.5, delay: 0.1 });
  await animate(
    "#line3",
    { x: -1710, y: -1710 },
    { duration: 0.5, delay: 0.2 },
  );

  animate("#illustration", { y: 0, display: "block" }, { duration: 0.5 });

  slowSliderHeading(animate, "#headingSlider");
  await slowSliderImages(animate, "#videoSlider");
}

async function slowSliderHeading(animate: Animate, element: string) {
  animate(element, { display: "flex" }, { duration: 0 });
  await animate(element, { x: "-100%" }, { duration: 0.5, delay: 0.5 });
  await animate(element, { x: "-140%" }, { duration: 5, ease: "linear" });
  await animate(element, { x: "-300%" }, { duration: 0.5 });
  await animate(element, { x: "-340%" }, { duration: 5, ease: "linear" });
  await animate(element, { x: "-535%" }, { duration: 0.5 });
  // await animate(element, { x: "-540%" }, { duration: 5, ease: "linear" });
}

async function slowSliderImages(animate: Animate, element: string) {
  animate(element, { display: "flex" }, { duration: 0 });
  await animate(element, { x: "-90%" }, { duration: 0.5, delay: 0.5 });
  await animate(element, { x: "-100%" }, { duration: 5, ease: "linear" });
  await animate(element, { x: "-290%" }, { duration: 0.5 });
  await animate(element, { x: "-300%" }, { duration: 5, ease: "linear" });
  await animate(element, { x: "-500%" }, { duration: 0.5 });
  // await animate(element, { x: "-500%" }, { duration: 5, ease: "linear" });
}
