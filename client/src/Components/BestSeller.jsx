import React from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

function BestSeller() {
  const { products } = useAppContext();

  return (
    <div className="py-10">
      <p className="text-2xl font-medium mb-4">Best Sellers</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products && products.length > 0 ? (
          products.slice(0, 5).map((item, index) => (
            <ProductCard key={index} product={item} />
          ))
        ) : (
          <p>Loading products...</p> 
        )}
      </div>
    </div>
  );
}

export default BestSeller;