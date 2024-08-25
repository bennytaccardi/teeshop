"use server";

import { User } from "@/entities/user";
import { currentUser } from "@clerk/nextjs/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function addOrderInfo(user: User): Promise<User> {
  const loggedUser = await currentUser();
  if (!loggedUser) {
    throw new Error("Operation not permitted");
  }
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  await supabase.from("users").insert({ ...user, user_id: loggedUser.id });
  return { ...user, user_id: loggedUser.id } as User;
}
