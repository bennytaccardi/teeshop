import React from "react";

const Newsletter = () => (
  <section className="bg-muted py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
        Stay in the Loop
      </h2>
      <form className="flex items-center bg-background p-4 rounded-md shadow-md">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 bg-transparent border-none outline-none text-foreground"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>
);

export default Newsletter;
