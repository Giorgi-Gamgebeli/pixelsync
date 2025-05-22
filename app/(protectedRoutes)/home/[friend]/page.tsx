"use client";

import { useDispatch } from "react-redux";
import AppHeader from "../../AppHeader";
import AppMain from "../../AppMain";
import { useEffect } from "react";
import { changeHeading, changeIcon } from "@/app/_redux/layoutSlice";

function Page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeHeading("Direct Messages"));
    dispatch(changeIcon("mdi:message-bubble"));
  }, []);

  return (
    <>
      <AppHeader>hallo</AppHeader>
      <AppMain>chat</AppMain>
    </>
  );
}

export default Page;
