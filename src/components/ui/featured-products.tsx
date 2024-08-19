import React from "react";
import Image from "next/image";

interface FeaturedProductProps {
  handleModal: (showModal: boolean) => void;
  showModal: boolean;
}

const products = [
  {
    name: "Syntax Tee",
    description: "Wear your code on your sleeve.",
    price: "$24.99",
    image: "/tshirt1.jpg",
    categoryQuiz: "python",
  },
  {
    name: "Bracket Buddy",
    description: "Never lose a bracket again.",
    price: "$19.99",
    image: "/tshirt2.jpg",
    categoryQuiz: "python",
  },
  {
    name: "Semicolon Swag",
    description: "Punctuate your style.",
    price: "$22.99",
    image: "/tshirt3.jpg",
    categoryQuiz: "python",
  },
  {
    name: "Bit Bytes",
    description: "Byte-sized fashion.",
    price: "$18.99",
    image: "/tshirt4.jpg",
    categoryQuiz: "python",
  },
];

const FeaturedProducts: React.FC<FeaturedProductProps> = ({
  handleModal,
  showModal,
}) => {
  const handleClick = (categoryQuiz: string) => {
    handleModal(showModal);
  };
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-muted p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleClick(product.categoryQuiz)}
            >
              <Image
                src="/placeholder.svg"
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>
              <p className="font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
