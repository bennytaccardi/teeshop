"use client";

import React from "react";
import { SignInButton } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const CustomSignInButton = () => {
  const searchParams = useSearchParams();
  const modalParam = searchParams.get("modal");

  const redirectUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${modalParam ? `/?modal=buy` : ""}`
      : "/";

  return (
    <SignInButton forceRedirectUrl={redirectUrl}>
      <button className="bg-background hover:bg-foreground text-foreground hover:text-background font-mono py-2 px-4 rounded-md w-full transition duration-300 ease-in-out transform hover:scale-105 border border-foreground">
        Sign in
      </button>
    </SignInButton>
  );
};

export default CustomSignInButton;
