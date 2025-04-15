"use client";

import { z } from "zod";
import FormRow from "../../_components/FormRow";
import Input from "../../_components/Input";
import { resetPassword } from "@/app/_dataAcessLayer/authActions";
import toast from "react-hot-toast";
import { ResetPasswordSchema } from "@/app/_schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function ResetPasswordForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    const res = await resetPassword(values);

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
        label="Email"
        type="email"
        id="email"
      />

      <div className="mt-10 mb-5 w-full border-b border-gray-300"></div>

      <button className="bg-brand-400 hover:bg-brand-500 border-brand-600 mb-5 w-full cursor-pointer rounded-lg border py-3 text-2xl text-gray-700 transition-all duration-300">
        Send reset email
      </button>
    </form>
  );
}

export default ResetPasswordForm;
