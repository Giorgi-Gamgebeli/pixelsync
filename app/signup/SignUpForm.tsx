"use client";

import Form from "../_components/Form";
import FormRow from "../_components/FormRow";
import Input from "../_components/Input";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "../_schemas/authSchemas";
import { signup } from "../_lib/actions";

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
    toast.success("Account created succesfully");
    reset();

    const res = await signup(values);

    if (res?.error) return toast.error(res.error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Username" error={errors.userName?.message}>
        <Input type="text" id="userName" register={register} />
      </FormRow>
      <FormRow label="Email" error={errors.email?.message}>
        <Input type="email" id="email" register={register} />
      </FormRow>
      <FormRow label="Password" error={errors.password?.message}>
        <Input type="password" id="password" register={register} />
      </FormRow>
      <FormRow label="Reapeat password" error={errors.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" register={register} />
      </FormRow>

      <button className="bg-brand-400 hover:bg-brand-500 border-brand-600 mt-14 w-full cursor-pointer rounded-lg border py-3 text-2xl text-gray-700 transition-all duration-300">
        Sign Up
      </button>
    </Form>
  );
}

export default SignUpForm;
