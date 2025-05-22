import { getFriends } from "@/app/_dataAcessLayer/userActions";
import Friends from "./Friends";

async function page() {
  const friends = await getFriends();

  return <Friends friends={friends} />;
}

export default page;
