"use client";

import FormRow from "../../_components/FormRow";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../../_schemas/authSchemas";
import { signup } from "../../_dataAcessLayer/authActions";

function SignUpForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupSchema>) {
    const res = await signup(values);

    if ("success" in res) {
      toast.success(res.success);
      reset();
    }
    if ("error" in res) toast.error(res.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        errors={errors}
        register={register}
        label="Username"
        type="text"
        id="userName"
      />

      <FormRow
        errors={errors}
        register={register}
        label="Email"
        type="email"
        id="email"
      />

      <FormRow
        errors={errors}
        register={register}
        label="Password"
        type="password"
        id="password"
      />

      <FormRow
        errors={errors}
        register={register}
        label="Reapeat password"
        type="password"
        id="passwordConfirm"
      />

      <button className="bg-brand-400 hover:bg-brand-500 border-brand-600 mt-14 w-full cursor-pointer rounded-lg border py-3 text-2xl text-gray-700 transition-all duration-300">
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
