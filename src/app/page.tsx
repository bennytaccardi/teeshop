/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import FeaturedProducts from "@/components/ui/featured-products";
import Features from "@/components/ui/features";
import Testimonials from "@/components/ui/testimonials";
import Newsletter from "@/components/ui/newsletter";
import Footer from "@/components/ui/footer";
import TestCodeModal from "@/components/ui/test-code-modal";
import OrderFormModal from "@/components/ui/order-form-modal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const supabase = createClientComponentClient();
  const [darkMode, setDarkMode] = useState(false);
  const [showCodingTestModal, setShowCodingTestModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const handleDarkMode = () => setDarkMode(!darkMode);
  const handleCodingTestModal = (show: boolean) =>
    setShowCodingTestModal(!show);
  const handleBuyModal = (show: boolean) => setShowBuyModal(!show);

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
          <Features />
          <Testimonials />
          <Newsletter />
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
