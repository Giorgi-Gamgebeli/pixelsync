"use client";

import { signin } from "../../_dataAcessLayer/authActions";
import FlexBox from "../../_components/FlexBox";
import FormRow from "../../_components/FormRow";
import Input from "../../_components/Input";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SigninSchema } from "@/app/_schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

function SignInForm() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      toast.error("Email already in use with different provider!");
    } else if (searchParams.get("verificationError")) {
      toast.error(searchParams.get("verificationError"));
    } else if (searchParams.get("verificationSuccess")) {
      toast.success(searchParams.get("verificationSuccess"));
    }
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninSchema>) {
    const res = await signin(values);

    if ("success" in res) {
      toast.success(res.success);
      reset();
    }
    if ("error" in res) toast.error(res.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexBox className="mt-8 items-center gap-3">
        <div className="w-full border-b border-gray-300"></div>
        <span className="text-xl">or</span>
        <div className="w-full border-b border-gray-300"></div>
      </FlexBox>

      <FormRow
        errors={errors}
        register={register}
        label="Email"
        type="email"
        id="email"
        defaultValue="jane@test.com"
      />

      <FormRow
        errors={errors}
        register={register}
        label="Password"
        type="password"
        id="password"
        defaultValue="password123"
        forgotPassword
      />

      <button className="bg-brand-400 hover:bg-brand-500 border-brand-600 mt-14 w-full cursor-pointer rounded-lg border py-3 text-2xl text-gray-700 transition-all duration-300">
        Sign In
      </button>
    </form>
  );
}

export default SignInForm;
