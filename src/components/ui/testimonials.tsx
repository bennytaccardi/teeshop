import React from "react";

const testimonials = [
  '"These t-shirts are the perfect way to show off my coding skills!" - John Doe',
  '"I get so many compliments on my Bracket Buddy tee!" - Jane Smith',
  '"Wearing my Semicolon Swag makes me feel like a true programming pro." - Bob Johnson',
];

const Testimonials = () => (
  <section className="py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
        Testimonials
      </h2>
      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-muted p-4 rounded-md shadow-md">
            <p className="text-muted-foreground">{testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
