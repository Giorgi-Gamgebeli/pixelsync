import FlexBox from "@/app/_components/FlexBox";
import HomeNavLink from "./HomeNavLink";
import { Icon } from "@iconify/react/dist/iconify.js";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-[20rem_1fr_1fr] grid-rows-3 text-[1.4rem]">
      <FlexBox className="flex-col p-3">
        <HomeNavLink href="/home/friends">
          <Icon icon="fa-solid:user-friends" />
          Friends
        </HomeNavLink>

        {/* <div className="w-full border-b border-gray-300 py-5" />

        <div className="row-span-full">friends</div> */}
      </FlexBox>
      {children}
    </main>
  );
}

export default layout;
