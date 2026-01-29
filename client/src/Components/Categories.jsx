import React from "react";
import { categories } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useAppContext();

  const handleCategoryClick = categoryText => {
    let query = categoryText;
    if (categoryText === "Organic Veggies") query = "Vegetables";
    if (categoryText === "Fresh Fruits") query = "Fruits";
    if (categoryText === "Dairy Products") query = "Dairy";
    if (categoryText === "Breads & Bakery") query = "Bakery";
    if (categoryText === "Cereals & Grains") query = "Cereals";
    setSearchQuery(query);
    navigate("/products");
  };

  return (
    <div className="mt-5">
      <p className="text-2xl font-medium mb-4">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 mt-6 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-5 px-3 rounded-lg flex flex-col justify-center items-center text-center"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => handleCategoryClick(category.text)}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-105 transition max-w-28 h-20 object-contain"
            />
            <p className="text-sm font-medium mt-2">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
