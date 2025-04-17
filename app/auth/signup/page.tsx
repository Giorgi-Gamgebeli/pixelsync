import Logo from "@/app/_components/Logo";
import Link from "next/link";
import FlexBox from "../../_components/FlexBox";
import UserAgreement from "../UserAgreement";
import AuthRightSide from "../AuthRightSide";
import SignUpForm from "./SignUpForm";

function Page() {
  return (
    <main className="grid min-h-[50rem] grid-cols-[44rem_1fr] text-gray-900">
      <FlexBox className="flex-col border border-gray-300 px-10 py-6">
        <Logo />

        <FlexBox className="h-full flex-col justify-center px-14 py-10">
          <h1 className="mb-2 text-[2.5rem]">Get started</h1>
          <h3 className="mb-12 text-lg text-gray-700">Create a new account</h3>

          <SignUpForm />

          <FlexBox className="mt-5 justify-center gap-2 text-xl">
            <p>Already have an account?</p>
            <Link href="/auth/signin" className="text-cyan-500 hover:underline">
              Sign In Now
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
