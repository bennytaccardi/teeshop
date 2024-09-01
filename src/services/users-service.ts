"use server";

import { db } from "@/db/client";
import { User } from "@/entities/user";

export async function saveUser(user: User): Promise<User> {
  const { data } = await db.from("users").insert(user).select();
  return data as User;
}
