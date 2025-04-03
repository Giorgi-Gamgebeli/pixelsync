"use server";

import {    signIn     } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { LoginSchema, SignupSchema } from "../_schemas/authSchemas";
import { db } from "./db";
import { hash } from "bcryptjs";
import { z } from "zod";

export async function login(formData: FormData) {
  const formDataObj = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = LoginSchema.safeParse(formDataObj);

  if (!result.success) return { error: "Invalid credentials" };
  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    console.error(error);
    return { error: "Something went REALLY wrong!" };
  }
}

export async function signup(values: z.infer<typeof SignupSchema>) {
  const result = SignupSchema.safeParse(values);

  if (!result.success)
    return {
      zodErrors: result.error.flatten().fieldErrors,
    };

  const { email, password, userName } = result.data;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    if (existingUser) return { error: "Email already in use" };

    const hashedPassword = await hash(password, 12);

    await db.user.create({
      data: {
        userName: userName,
        email,
        password: hashedPassword,
      },
    });

    return { sucess: "User created successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
