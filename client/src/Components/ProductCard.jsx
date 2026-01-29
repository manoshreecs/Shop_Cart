import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems } = useAppContext();
  const quantity = cartItems[product._id] || 0;

  return (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full hover:shadow-md transition-shadow">
      <Link to={`/product/${product._id}`} onClick={() => window.scrollTo(0,0)} className="group cursor-pointer flex items-center justify-center px-2">
        <img 
          className="group-hover:scale-105 transition h-32 md:h-40 object-contain" 
          src={Array.isArray(product.image) ? product.image[0] : product.image} 
          alt={product.name} 
        />
      </Link>

      <div className="text-gray-500/60 text-sm mt-2">
        <p>{product.category}</p>
        <Link to={`/product/${product._id}`} onClick={() => window.scrollTo(0,0)}>
           <p className="text-gray-700 font-medium text-lg truncate w-full hover:text-indigo-600 transition-colors">
             {product.name}
           </p>
        </Link>

        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map(i => (
            <span
              key={i}
              className={i <= product.rating ? "text-green-600" : "text-gray-300"}
            >
              ★
            </span>
          ))}
          <p className="text-xs ml-1">({product.rating})</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            {currency}{product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              {currency}{product.price}
            </span>
          </p>

          {quantity === 0 ? (
            <button onClick={() => addToCart(product._id)} className="bg-indigo-100 border border-indigo-300 px-4 h-[34px] rounded text-indigo-600 font-medium hover:bg-indigo-200 transition">
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-indigo-500/25 rounded h-[34px] px-2 font-bold text-indigo-700">
              <button className="px-2 hover:bg-indigo-200 rounded" onClick={() => removeFromCart(product._id)}>-</button>
              <span className="w-4 text-center">{quantity}</span>
              <button className="px-2 hover:bg-indigo-200 rounded" onClick={() => addToCart(product._id)}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;