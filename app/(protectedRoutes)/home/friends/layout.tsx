import { Icon } from "@iconify/react/dist/iconify.js";
import AppHeader from "../../AppHeader";
import AppMain from "../../AppMain";
import Filter from "./Filter";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader>
        <h2 className="flex items-center gap-4">
          <Icon icon="fa-solid:user-friends" />
          Friends
        </h2>
        <Filter />
      </AppHeader>
      <AppMain>{children}</AppMain>
      {/* <div className="col-start-3 col-end-4 row-start-2 -row-end-1"> */}
      {/*   friends activity */}
      {/* </div> */}
    </>
  );
}

export default layout;
