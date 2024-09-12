/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import FeaturedProducts from "@/components/ui/featured-products";
import Footer from "@/components/ui/footer";
import TestCodeModal from "@/components/ui/test-code-modal";
import OrderFormModal from "@/components/ui/order-form-modal";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const [darkMode, setDarkMode] = useState(false);
  const [showCodingTestModal, setShowCodingTestModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const handleDarkMode = () => setDarkMode(!darkMode);

  const handleCodingTestModal = (show: boolean) => {
    setShowCodingTestModal(!show);
  };

  const handleBuyModal = (show: boolean) => {
    setShowBuyModal(!show);
    updateURL("buy");
  };

  const updateURL = (modalType: string | null) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (modalType) {
        url.searchParams.set("modal", modalType);
      } else {
        url.searchParams.delete("modal");
      }
      window.history.pushState({}, "", url);
    }
  };

  useEffect(() => {
    const modalParam = searchParams.get("modal");
    if (modalParam === "buy") {
      setShowBuyModal(true);
    }
  }, [searchParams]);

  return (
    <div
      className={`font-mono bg-background text-foreground min-h-screen flex flex-col ${
        darkMode ? "dark" : ""
      }`}
    >
      <Header handleDarkMode={handleDarkMode} darkMode={darkMode} />
      <main className="flex-grow">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          <FeaturedProducts
            handleModal={handleCodingTestModal}
            showModal={showCodingTestModal}
          />
        </div>
      </main>
      <Footer />
      {(showCodingTestModal || showBuyModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div>
            {showCodingTestModal && (
              <TestCodeModal
                handleCodingTestModal={handleCodingTestModal}
                handleBuyModal={handleBuyModal}
                showModal={showCodingTestModal}
              />
            )}
            {showBuyModal && (
              <OrderFormModal
                handleBuyModal={handleBuyModal}
                showModal={showBuyModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
