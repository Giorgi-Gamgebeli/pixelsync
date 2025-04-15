"use client";

import { z } from "zod";
import FormRow from "../../_components/FormRow";
import { newPassword } from "@/app/_dataAcessLayer/authActions";
import toast from "react-hot-toast";
import { NewPasswordSchema } from "@/app/_schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/app/_components/Input";

function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
    if (!token) return toast.error("Missing token!");

    const res = await newPassword(values);

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
        label="New password"
        type="password"
        id="password"
      />

      <FormRow
        errors={errors}
        register={register}
        label="Confirm new password"
        type="password"
        id="passwordConfirm"
      />

      <Input
        register={register}
        defaultValue={token || ""}
        hidden
        type="text"
        id="token"
      />

      <div className="mt-10 mb-5 w-full border-b border-gray-300"></div>

      <button className="bg-brand-400 hover:bg-brand-500 border-brand-600 mb-5 w-full cursor-pointer rounded-lg border py-3 text-2xl text-gray-700 transition-all duration-300">
        Reset password
      </button>
    </form>
  );
}

export default NewPasswordForm;
