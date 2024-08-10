"use client";

import React, { useState, useRef } from "react";
import Header from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import FeaturedProducts from "@/components/ui/featured-products";
import Features from "@/components/ui/features";
import Testimonials from "@/components/ui/testimonials";
import Newsletter from "@/components/ui/newsletter";
import Footer from "@/components/ui/footer";
import TestCodeModal from "@/components/ui/test-code-modal";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDarkMode = () => setDarkMode(!darkMode);
  const handleModal = (show: boolean) => {
    setShowModal(!show);
  };

  return (
    <div
      className={`font-mono bg-background text-foreground ${
        darkMode ? "dark" : ""
      }`}
    >
      <Header
        handleModal={handleModal}
        showModal={showModal}
        handleDarkMode={handleDarkMode}
        darkMode={darkMode}
      />
      <main>
        <Hero />
        <FeaturedProducts />
        <Features />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <TestCodeModal handleModal={handleModal} showModal={showModal} />
          </div>
        </div>
      )}
    </div>
  );
}
