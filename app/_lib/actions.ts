"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { SigninSchema, SignupSchema } from "../_schemas/authSchemas";
import { db } from "./db";
import { hash } from "bcryptjs";
import { z } from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function signin(formData: FormData) {
  const formDataObj = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = SigninSchema.safeParse(formDataObj);

  if (!result.success) return { error: "Invalid credentials" };
  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
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
      error: "Validation failed on server",
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

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { sucess: "User created successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function githubProvider() {
  await signIn("github", {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  });
}

export async function googleProvider() {
  await signIn("google", {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  });
}
