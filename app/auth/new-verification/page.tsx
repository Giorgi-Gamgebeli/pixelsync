"use client";

import FlexBox from "@/app/_components/FlexBox";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { newVerification } from "@/app/_dataAcessLayer/authActions";
import { BounceLoader } from "react-spinners";
import Logo from "@/app/_components/Logo";

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  async function onSubmit() {
    if (!token)
      return router.replace(
        `/auth/signin?verificationError=${"Missing token!"}`,
      );

    const res = await newVerification(token);

    if ("success" in res)
      router.replace(`/auth/signin?verificationSuccess=${res.success}`);
    if ("error" in res)
      router.replace(`/auth/signin?verificationError=${res.error}`);
  }

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Logo className="absolute top-0 left-0 px-10 py-6" />

      <FlexBox className="flex-col items-center gap-20 rounded-2xl p-5">
        <BounceLoader color="oklch(0.715 0.143 215.221)" size={80} />
      </FlexBox>
    </main>
  );
}

export default Page;
