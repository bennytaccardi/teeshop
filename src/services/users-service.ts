"use server";

import { db } from "@/db/client";
import { User } from "@/entities/user";

export async function saveUser(user: User): Promise<User> {
  const { data } = await db.from("users").upsert(user).select();
  return data as User;
}

export async function getUserByEmail(userEmail: string): Promise<User> {
  const { data } = await db.from("users").select("*").eq("email", userEmail);
  return data as User;
}
