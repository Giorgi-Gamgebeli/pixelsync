import AppHeader from "../../AppHeader";
import AppMain from "../../AppMain";
import Image from "next/image";
import defaultUser from "@/public/default-user.jpg";
import Empty from "@/app/_components/Empty";
import { getFriend } from "@/app/_dataAcessLayer/userActions";
import Messages from "./Messages";

type Params = {
  params: Promise<{
    friendID: string;
  }>;
};

async function Page({ params }: Params) {
  const { friendID } = await params;
  const friend = await getFriend({ id: friendID });
  if (!friend) return <Empty text="Friend was not found!" />;

  const { image, status, userName, sentMessages, receivedMessages } = friend;

  return (
    <>
      <AppHeader>
        <div className="flex items-center gap-4 py-1">
          <div className="relative h-10 w-10">
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
              {status.slice(0, 1) + status.slice(1).toLowerCase()}
            </span>
          </p>
        </div>
      </AppHeader>
      <AppMain>
        <Messages
          sentMessages={sentMessages}
          receivedMessages={receivedMessages}
        />
      </AppMain>
    </>
  );
}

export default Page;
