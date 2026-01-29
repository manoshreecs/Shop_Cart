import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SellerLogin = () => {
  const { isSeller, setIsSeller, backendUrl } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("shopcart123");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/seller/login",
        { email, password }
      );

      if (data.success) {
        setIsSeller(true);
        toast.success("Login Successful");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  if (isSeller) return null;

  return (
    <div className="min-h-screen flex items-center justify-center text-sm text-gray-600 bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 p-8 py-12 min-w-80 sm:min-w-96 rounded-xl bg-white border border-gray-200 ring-1 ring-gray-300 shadow-md transition-all duration-300 hover:shadow-2xl hover:ring-green-500 hover:-translate-y-1"
      >
        <p className="text-2xl font-medium text-center">
          <span className="text-green-600 font-semibold">Seller</span> Login
        </p>

        <div className="w-full text-left">
          <p className="mb-1">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="w-full text-left">
          <p className="mb-1">Password</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button
              type="button"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}
              className="absolute right-3 top-2.5 cursor-pointer select-none text-base opacity-70 hover:opacity-100 bg-transparent border-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg font-medium w-full mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;