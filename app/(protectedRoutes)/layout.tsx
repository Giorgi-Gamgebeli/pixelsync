import { cloneElement } from "react";
import FlexBox from "../_components/FlexBox";
import PageHeading from "./PageHeading";
import Servers from "./Projects";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen min-h-[40rem] w-screen min-w-[40rem] flex-col">
      <PageHeading />

      <FlexBox className="grow">
        <Servers />
        <div className="w-full rounded-tl-3xl border border-gray-300">
          {children}
        </div>
      </FlexBox>
    </div>
  );
}

export default layout;
