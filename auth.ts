import NextAuth, { NextAuthResult } from "next-auth";
import authConfig from "./auth.config";
import { db } from "@/app/_lib/db";

const nexAuth = NextAuth({
  callbacks: {
    async signIn({ user }) {
      console.log(user);
      if (!user?.email || !user.name) return false;

      const existingUser = await db.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await db.user.create({
          data: {
            email: user.email,
            userName: user.name,
            avatar: user.image,
          },
        });
      }

      return true;
    },

    async jwt({ token }) {
      if (!token.email) return token;

      const existingUser = await db.user.findUnique({
        where: {
          email: token.email,
        },
        select: {
          id: true,
          avatar: true,
          userName: true,
        },
      });

      if (!existingUser) return token;

      return {
        sub: String(existingUser.id),
        avatar: existingUser.avatar,
        userName: existingUser.userName,
        email: token.email,
        iat: token.iat,
        exp: token.exp,
        jti: token.jti,
      };
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
