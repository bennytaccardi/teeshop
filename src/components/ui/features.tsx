import React from "react";

const features = [
  { name: "Responsive Design", description: "Looks great on any device." },
  { name: "Dark Mode", description: "Easy on the eyes." },
  { name: "Lazy Loading", description: "Faster page loads." },
  { name: "Konami Code", description: "Find the secret discount!" },
];

const Features = () => (
  <section className="bg-muted py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
        Features
      </h2>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="bg-background p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-2">{feature.name}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Features;
