"use client";

import { changeHeading, changeIcon } from "@/app/_redux/layoutSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function page() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeHeading("Friends"));
    dispatch(changeIcon("fa-solid:user-friends"));
  }, []);

  return (
    <>
      {/* // <div className="grid grid-cols-2 grid-rows-3"> */}
      <div className="col-start-2 col-end-4 row-start-1 row-end-2">filter</div>
      <div className="col-start-2 col-end-3">search</div>
      <div className="col-start-2 col-end-3">status</div>
      <div className="col-start-3 col-end-4 row-start-2 -row-end-1">
        friends activity
      </div>
      {/* // </div> */}
    </>
  );
}

export default page;
