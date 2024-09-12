import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/entities/product";
import { getActiveProducts } from "@/services/product-service";

interface FeaturedProductProps {
  handleModal: (showModal: boolean) => void;
  showModal: boolean;
}

const FeaturedProducts: React.FC<FeaturedProductProps> = ({
  handleModal,
  showModal,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getActiveProducts();
      setProducts(fetchedProducts ?? []);
    };

    fetchProducts();
  }, []);
  const handleClick = () => {
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
              onClick={() => handleClick()}
            >
              <Image
                src={product.image_url ?? "/fallback.jpg"}
                alt={product.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
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
