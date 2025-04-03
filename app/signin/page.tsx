import Link from "next/link";
import Form from "../_components/Form";
import FormRow from "../_components/FormRow";
import Input from "../_components/Input";
import FlexBox from "../_components/FlexBox";
import { githubProvider, googleProvider, signin } from "../_lib/actions";
import Image from "next/image";
import logo from "../../public/noBGLogo.png";
import ProviderButton from "../_components/ProviderButton";
import AuthRightSide from "../_components/AuthRightSide";
import UserAgreement from "../_components/UserAgreement";

function Page() {
  return (
    <main className="grid min-h-[66.5rem] grid-cols-[44rem_1fr] text-gray-900">
      <FlexBox className="flex-col border border-gray-300 px-10 py-6">
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
          <Form action={signin}>
            <h1 className="mb-2 text-[2.5rem]">Welcome back</h1>

            <h3 className="mb-12 text-lg text-gray-700">
              Sign in to your account
            </h3>

            <ProviderButton icon="line-md:github-loop" action={githubProvider}>
              Continue with Github
            </ProviderButton>
            <ProviderButton
              icon="flat-color-icons:google"
              action={googleProvider}
            >
              Continue with Google
            </ProviderButton>

            <FlexBox className="mt-8 items-center gap-3">
              <div className="w-full border-b border-gray-300"></div>
              <span className="text-xl">or</span>
              <div className="w-full border-b border-gray-300"></div>
            </FlexBox>

            <FormRow label="Email">
              <Input defaultValue="jane@test.com" type="email" id="email" />
            </FormRow>

            <FormRow label="Password">
              <Link
                href="passwordrecovery"
                className="absolute top-[0.6rem] right-0 mt-2 inline-block text-xl hover:underline"
              >
                Forgot Password?
              </Link>

              <Input type="password" defaultValue="password123" id="password" />
            </FormRow>

            <button className="bg-brand-400 hover:bg-brand-500 border-brand-600 mt-14 w-full cursor-pointer rounded-lg border py-3 text-2xl text-gray-700 transition-all duration-300">
              Sign In
            </button>

            <FlexBox className="mt-5 justify-center gap-2 text-xl">
              <p>Don&apos;t have an account?</p>
              <Link
                href="/signup"
                className="text-brand-500 underline hover:no-underline"
              >
                Sign Up Now
              </Link>
            </FlexBox>

            <UserAgreement />
          </Form>
        </FlexBox>
      </FlexBox>

      <AuthRightSide />
    </main>
  );
}

export default Page;
