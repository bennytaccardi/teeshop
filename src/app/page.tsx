"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/ui/header";
import Hero from "@/components/ui/hero";
import FeaturedProducts from "@/components/ui/featured-products";
import Features from "@/components/ui/features";
import Testimonials from "@/components/ui/testimonials";
import Newsletter from "@/components/ui/newsletter";
import Footer from "@/components/ui/footer";
import TestCodeModal from "@/components/ui/test-code-modal";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleDarkMode = () => setDarkMode(!darkMode);
  const handleModal = (showModal: boolean) => {
    setShowModal(!showModal);
  };
  const handleLogin = () => {
    setLoggedIn(true);
    setShowModal(false);
  };

  // useEffect(() => {}, []);

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
        <TestCodeModal
          handleModal={handleModal}
          showModal={showModal}
          handleLogin={handleLogin}
          loggedIn={loggedIn}
        />
      )}
    </div>
  );
}
