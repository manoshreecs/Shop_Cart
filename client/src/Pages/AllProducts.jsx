import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../Components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (typeof searchQuery === "string" && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();

      setFilteredProducts(
        products.filter((product) => {
          const productName = product.name?.toLowerCase() || "";

          const categoryArray = Array.isArray(product.category)
            ? product.category
            : [product.category || ""];

          const categoryString = categoryArray.join(" ").toLowerCase();

          return (
            productName.includes(query) ||
            categoryString.includes(query)
          );
        })
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col px-4 md:px-10 lg:px-20">
      <div className="flex flex-col items-end w-max mb-6">
        <p className="text-2xl font-medium uppercase">
          {searchQuery?.trim() ? searchQuery : "All Products"}
        </p>

        <div className="w-16 h-0.5 bg-green-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
