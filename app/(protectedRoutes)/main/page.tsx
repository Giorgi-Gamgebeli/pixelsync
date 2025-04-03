"use client";

import { useSession } from "next-auth/react";

function Page() {
  const { data: session } = useSession();
  console.log(session);

  if (!session) return <p>no session</p>;

  return (
    <main className="h-screen w-screen">
      <>{JSON.stringify(session?.user)}</>
    </main>
  );
}

export default Page;
