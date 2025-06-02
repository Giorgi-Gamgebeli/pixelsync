"use server";

import { auth } from "@/auth";
import { db } from "./db";
import {
  AddFriendSchema,
  DeletePendingFriendRequestSchema,
} from "../_schemas/schemas";
import { z } from "zod";
import { handleErrorsOnServer } from "../_utils/helpers";

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
        friendOf: {
          select: {
            id: true,
            userName: true,
            image: true,
            status: true,
          },
        },
      },
    });

    const friends = userWithFriends?.friends || [];
    const friendOf = userWithFriends?.friendOf || [];

    // Create sets of IDs for fast comparison
    const friendIds = new Set(friends.map((f) => f.id));
    const mutualFriends = friendOf.filter((f) => friendIds.has(f.id));
    console.log(userWithFriends);

    return mutualFriends;
  } catch (error) {
    console.error("Failed to get mutual friends:", error);
    return [];
  }
}

export async function getPendingFriendRequests() {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    const currentUserFriends = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        friends: {
          select: {
            id: true,
            userName: true,
            name: true,
            image: true,
          },
        },
        friendOf: {
          select: {
            id: true,
            userName: true,
            name: true,
            image: true,
          },
        },
      },
    });

    const friendsIDs = new Set(currentUserFriends?.friends.map((f) => f.id));
    const friendOfIDs = new Set(currentUserFriends?.friendOf.map((f) => f.id));

    const friendRequestsToThem =
      currentUserFriends?.friends
        .filter((f) => !friendOfIDs.has(f.id))
        .map((f) => ({ ...f, requestToMe: false })) || [];

    const friendRequestsToMe =
      currentUserFriends?.friendOf
        .filter((f) => !friendsIDs.has(f.id))
        .map((f) => ({ ...f, requestToMe: true })) || [];

    return [...friendRequestsToThem, ...friendRequestsToMe];
  } catch (error) {
    console.log(error);
  }
}

export async function addFriend(values: z.infer<typeof AddFriendSchema>) {
  try {
    const result = AddFriendSchema.safeParse(values);
    if (result.error) throw new Error("Validation failed on server!");
    const { userName } = result.data;

    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    const currentUserId = session.user.id;

    const existingFriend = await db.user.findUnique({
      where: {
        userName,
      },
    });

    if (!existingFriend) throw new Error("That account doesn't exist!");
    if (currentUserId === existingFriend.id)
      throw new Error("You can't add yourself!");

    const alreadyFriend = await db.user.findUnique({
      where: {
        id: currentUserId,
        friends: {
          some: {
            id: existingFriend.id,
          },
        },
      },
    });

    if (alreadyFriend) throw new Error("This person is already your friend!");

    await db.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        friends: {
          connect: {
            id: existingFriend.id,
          },
        },
      },
    });
  } catch (error) {
    return handleErrorsOnServer(error);
  }
}

export async function deletePendingFriendRequest(
  values: z.infer<typeof DeletePendingFriendRequestSchema>,
) {
  try {
    const result = DeletePendingFriendRequestSchema.safeParse(values);
    if (result.error) throw new Error("Validation failed on server!");
    const { id } = result.data;

    const session = await auth();
    if (!session) throw new Error("Not authenticated!");

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        friends: {
          disconnect: {
            id,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
