import React from "react";

const Hero = () => (
  <section className="bg-muted py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
        Wear Your Code
      </h1>
      <p className="text-lg sm:text-xl lg:text-2xl mb-8">
        Show off your programming prowess with our stylish developer t-shirts.
      </p>
      <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        git checkout --shirt
      </button>
    </div>
  </section>
);

export default Hero;
