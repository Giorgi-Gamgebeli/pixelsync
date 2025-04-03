import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/app/_schemas/authSchemas";
import { db } from "@/app/_lib/db";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  session: {
    maxAge: 2 * 24 * 60 * 60, // inactive for 2 days = logout
    strategy: "jwt",
  },
  providers: [
    Google,
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const result = LoginSchema.safeParse(credentials);

        if (!result.success) return null;

        const { email, password } = result.data;

        const user = await db.user.findUnique({
          where: {
            email,
          },
          select: {
            password: true,
            email: true,
            id: true,
            userName: true,
          },
        });

        if (!user || !user.password) return null;

        const isPasswordValid = await compare(
          password as string,
          user.password as string
        );

        if (!isPasswordValid) return null;

        return {
          numID: +user.id,
          email: user.email,
          userName: user.userName,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
} satisfies NextAuthConfig;
