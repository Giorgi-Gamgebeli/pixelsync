"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

function Page() {
  const { data: session, update } = useSession();

  useEffect(() => {
    update();
  }, []);

  if (!session) return <p>no session</p>;

  return (
    <main className="h-screen w-screen">
      <>{JSON.stringify(session?.user)}</>
    </main>
  );
}

export default Page;
