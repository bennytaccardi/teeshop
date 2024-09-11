"use server";

import { User } from "@/entities/user";
import { getUserByEmail, saveUser } from "@/services/users-service";
import { currentUser } from "@clerk/nextjs/server";

export async function addOrderInfo(user: User): Promise<User> {
  const loggedUser = await currentUser();
  if (!loggedUser || !loggedUser.primaryEmailAddress) {
    throw new Error("Operation not permitted");
  }
  // const existentUser = await getUserByEmail(
  //   loggedUser.primaryEmailAddress.emailAddress
  // );
  // if (existentUser) throw new Error("User already exitent in db");
  return await saveUser({ ...user, user_id: loggedUser.id });
}
