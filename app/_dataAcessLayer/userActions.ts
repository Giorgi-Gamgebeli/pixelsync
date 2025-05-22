import { auth } from "@/auth";
import { db } from "./db";

export async function getFriends() {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    const userWithFriends = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        friends: {
          select: {
            id: true,
            userName: true,
            image: true,
            status: true,
          },
        },
      },
    });

    const friends = userWithFriends?.friends;

    return friends;
  } catch (error) {
    console.error(error);
  }
}
