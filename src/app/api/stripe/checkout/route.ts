"use server";

import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const loggedUser = await currentUser();
  if (!loggedUser) throw new Error("User not authenticated");
  console.log("Hey");
  try {
    const data = await req.json();
    const { priceId } = data;
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        customer_email: loggedUser.primaryEmailAddress?.emailAddress,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_BASE_URL}`,
        cancel_url: `${process.env.NEXT_BASE_URL}`,
        metadata: {
          userId: loggedUser.id,
          priceId,
        },
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
