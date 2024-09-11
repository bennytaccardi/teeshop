"use server";

import { db } from "@/db/client";
import { Product } from "@/entities/product";

export async function getActiveProducts(): Promise<Product[]> {
  const { data } = await db.from("products").select("*").eq("is_active", 1);
  return data as Product[];
}
