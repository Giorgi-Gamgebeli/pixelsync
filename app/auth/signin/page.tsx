import Logo from "@/app/_components/Logo";
import Link from "next/link";
import { Suspense } from "react";
import FlexBox from "../../_components/FlexBox";
import UserAgreement from "../UserAgreement";
import AuthRightSide from "../AuthRightSide";
import SignInForm from "./SignInForm";

function Page() {
  return (
    <main className="grid min-h-[66.5rem] grid-cols-[44rem_1fr] text-gray-900">
      <FlexBox className="flex-col border border-gray-300 px-10 py-6">
        <Logo />

        <FlexBox className="h-full flex-col justify-center px-14 py-10">
          <h1 className="mb-2 text-[2.5rem]">Welcome back</h1>

          <h3 className="mb-12 text-lg text-gray-700">
            Sign in to your account
          </h3>

          <Suspense>
            <SignInForm />
          </Suspense>

          <FlexBox className="mt-5 justify-center gap-2 text-xl">
            <p>Don&apos;t have an account?</p>
            <Link
              href="/auth/signup"
              className="text-brand-500 hover:underline"
            >
              Sign Up Now
            </Link>
          </FlexBox>

          <UserAgreement />
        </FlexBox>
      </FlexBox>

      <AuthRightSide />
    </main>
  );
}

export default Page;
