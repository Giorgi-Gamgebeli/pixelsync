import FlexBox from "../_components/FlexBox";
import logo from "../../public/noBGLogo.png";
import Image from "next/image";
import AuthRightSide from "../_components/AuthRightSide";
import SignUpForm from "./SignUpForm";
import ProviderButton from "../_components/ProviderButton";
import Link from "next/link";
import UserAgreement from "../_components/UserAgreement";

function Page() {
  return (
    <main className="grid min-h-[50rem] grid-cols-[44rem_1fr] text-gray-900">
      <FlexBox className="border-secondary/20 flex-col border px-10 py-6">
        <FlexBox className="items-center gap-1">
          <Image
            src={logo}
            alt="logo of the company"
            priority
            className=""
            height={50}
            width={50}
          />
          <h2 className="text-2xl font-semibold">Pixel Sync</h2>
        </FlexBox>

        <FlexBox className="h-full flex-col justify-center px-14 py-10">
          <h1 className="mb-2 text-[2.5rem]">Get started</h1>
          <h3 className="mb-12 text-lg text-gray-700">Create a new account</h3>

          <ProviderButton icon="line-md:github-loop">
            Continue with Github
          </ProviderButton>
          <ProviderButton icon="flat-color-icons:google">
            Continue with Google
          </ProviderButton>

          <FlexBox className="mt-8 items-center gap-3">
            <div className="w-full border-b border-gray-300"></div>
            <span className="text-xl">or</span>
            <div className="w-full border-b border-gray-300"></div>
          </FlexBox>

          <SignUpForm />

          <FlexBox className="mt-5 justify-center gap-2 text-xl">
            <p>Already have an account?</p>
            <Link
              href="/signin"
              className="text-cyan-500 underline hover:no-underline"
            >
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
