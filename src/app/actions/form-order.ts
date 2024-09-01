"use server";

import { User } from "@/entities/user";
import { saveUser } from "@/services/users-service";
import { currentUser } from "@clerk/nextjs/server";

export async function addOrderInfo(user: User): Promise<User> {
  const loggedUser = await currentUser();
  if (!loggedUser) {
    throw new Error("Operation not permitted");
  }
  return await saveUser({ ...user, user_id: loggedUser.id });
}
