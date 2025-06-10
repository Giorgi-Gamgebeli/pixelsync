"use client";

import { changeHeading, changeIcon } from "@/app/_redux/layoutSlice";
import { DirectMessage } from "@prisma/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type MessagesProps = {
  sentMessages: DirectMessage[];
  receivedMessages: DirectMessage[];
};

function Messages({ sentMessages, receivedMessages }: MessagesProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeHeading("Direct Messages"));
    dispatch(changeIcon("mdi:message-bubble"));
  }, []);
  return <div></div>;
}

export default Messages;
