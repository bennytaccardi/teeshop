"use client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
type props = {
  priceId: string;
  price: string;
  description: string;
};
const BuyButton = ({ priceId, price, description }: props) => {
  const handleSubmit = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
    );
    if (!stripe) {
      return;
    }
    try {
      const response = await axios.post(
        "/api/stripe/checkout",
        { priceId: priceId },
        {
          headers: {
            "Content-Type": "application/json",
            // Add any other necessary headers
          },
        }
      );
      const data = response.data;
      if (!data.ok) throw new Error("Something went wrong");
      await stripe.redirectToCheckout({
        sessionId: data.result.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 sm:px-5 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      onClick={handleSubmit}
    >
      Pay
    </button>
  );
};
export default BuyButton;
