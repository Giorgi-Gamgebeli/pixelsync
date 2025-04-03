import NextAuth, { NextAuthResult } from "next-auth";
import authConfig from "./auth.config";
import { db } from "@/app/_lib/db";

const nexAuth = NextAuth({
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id as string);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }

    //   return true;
    // },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: {
          id: +token.sub as number,
        },
        select: {
          avatar: true,
          userName: true,
        },
      });

      if (!existingUser) return token;

      token.avatar = existingUser.avatar;
      token.userName = existingUser.userName;

      return token;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.numID = +token.sub;
      }

      if (session.user) {
        session.user.avatar = token.avatar as string;
        session.user.userName = token.userName as string;
      }

      return session;
    },
  },
  ...authConfig,
});

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
} = nexAuth;
export const auth: NextAuthResult["auth"] = nexAuth.auth;
