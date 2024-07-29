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

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleDarkMode = () => setDarkMode(!darkMode);
  const handleModal = () => setShowModal(!showModal);
  const handleLogin = () => {
    setLoggedIn(true);
    setShowModal(false);
  };

  const handleKonamiCode = (event: KeyboardEvent) => {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    const userInput = event.key.split("").map((key) => key.charCodeAt(0));
    if (userInput.toString() === konamiCode.toString()) {
      alert("You found the secret discount code! 🎉");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKonamiCode);
    return () => {
      document.removeEventListener("keydown", handleKonamiCode);
    };
  }, []);

  return (
    <div
      className={`font-mono bg-background text-foreground ${
        darkMode ? "dark" : ""
      }`}
    >
      <Header
        handleModal={handleModal}
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
          handleLogin={handleLogin}
          loggedIn={loggedIn}
        />
      )}
    </div>
  );
}
