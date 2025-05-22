"use client";

import { UserStatus } from "@/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeHeading, changeIcon } from "@/app/_redux/layoutSlice";
import Image from "next/image";
import defaultUser from "@/public/default-user.jpg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import HomeNavLink from "../HomeNavLink";
import AddFriend from "./AddFriend";

type FriendsProps = {
  friends:
    | {
        id: string;
        userName: string | null;
        image: string | null;
        status: UserStatus;
      }[]
    | undefined;
};

function Friends({ friends: unsortedFriends }: FriendsProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeHeading("Friends"));
    dispatch(changeIcon("fa-solid:user-friends"));
  }, []);

  const searchParams = useSearchParams();
  const filterBy = searchParams.get("filterBy") || "online";

  let friends =
    filterBy === "online"
      ? unsortedFriends?.filter(({ status }) => status === "ONLINE")
      : unsortedFriends;

  if (filterBy === "addfriend") return <AddFriend />;

  return (
    <div className="px-10 py-5">
      <div className="relative">
        <input
          placeholder="Search"
          className="w-full rounded-xl border border-gray-300 px-5 py-3"
        />
        <Icon
          icon="mdi-light:magnify"
          className="absolute top-1/2 right-5 -translate-y-1/2 text-4xl text-gray-700"
        />
      </div>

      <h3 className="my-5">
        {filterBy === "online" ? "Online" : "All friends"} - {friends?.length}
      </h3>

      {friends?.length ? (
        friends.map(({ userName, image, status, id }, i) => (
          <HomeNavLink
            href={`/home/${id}`}
            key={i}
            className={`justify-between rounded-none border-t border-gray-300 py-3 hover:rounded-xl hover:border-gray-200 ${
              friends.length === i + 1 ? "" : "border-b"
            }`}
          >
            <div className="flex gap-5">
              <div className="relative h-12 w-12">
                <Image
                  fill
                  src={image || defaultUser}
                  alt={`Image of ${userName || "user"}`}
                  className="rounded-full"
                />
              </div>
              <p className="flex flex-col gap-0 text-gray-700">
                {userName}
                <span className="text-base">
                  {status[0] + status.slice(1).toLowerCase()}
                </span>
              </p>
            </div>

            <div className="flex gap-5 text-gray-700">
              <Icon
                icon="jam:message-alt-f"
                className="rounded-full bg-gray-100 p-2 text-5xl transition-all duration-300 hover:text-gray-900"
              />
              <Icon
                icon="entypo:dots-three-vertical"
                className="rounded-full bg-gray-100 p-2 text-5xl transition-all duration-300 hover:text-gray-900"
              />
            </div>
          </HomeNavLink>
        ))
      ) : (
        <p>Add friends</p>
      )}
    </div>
  );
}

export default Friends;
