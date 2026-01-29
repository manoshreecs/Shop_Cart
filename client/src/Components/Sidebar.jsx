import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Logins from "./logins";
import toast from "react-hot-toast";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    searchQuery,
    setSearchQuery,
    getCartCount,
    axios,
    backendUrl,
    loading
  } = useAppContext();

  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-600 font-semibold"
      : "text-gray-800 hover:text-green-600 font-medium transition-colors";

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/logout`);
      if (data.success) {
        setUser(null);
        toast.success(data.message);
        setIsMenuOpen(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() !== "") navigate("/products");
  };

  return (
    <>
      <nav className="w-full px-4 md:px-10 py-3 md:py-4 flex justify-between items-center sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/30">
        <Link to="/" className="text-3xl font-bold text-green-600">
          Shopcart
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>All Products</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>

          <input
            type="text"
            value={typeof searchQuery === "string" ? searchQuery : ""}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-[260px] outline-none focus:border-green-600 text-sm bg-white/80"
          />

          <Link to="/cart" className="relative text-2xl text-gray-700">
            🛒
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {getCartCount()}
            </span>
          </Link>

          {!loading && !user && (
            <button
              onClick={() => setShowUserLogin(true)}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Login
            </button>
          )}

          {!loading && user && (
            <div className="group relative">
              <span className="text-2xl cursor-pointer p-2 rounded-full bg-white/60 hover:bg-white/90 transition">
                👤
              </span>
              <div className="group-hover:block hidden absolute right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-500 rounded shadow-lg border border-gray-100">
                  <p
                    onClick={() => {
                      navigate("/my-orders");
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer hover:text-green-600"
                  >
                    My Orders
                  </p>
                  <p
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-red-600 border-t pt-2"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-white border-b border-gray-200 flex flex-col gap-4">
          <NavLink onClick={() => setIsMenuOpen(false)} to="/" className={linkClass}>Home</NavLink>
          <NavLink onClick={() => setIsMenuOpen(false)} to="/products" className={linkClass}>All Products</NavLink>
          <NavLink onClick={() => setIsMenuOpen(false)} to="/contact" className={linkClass}>Contact</NavLink>

          <input
            type="text"
            value={typeof searchQuery === "string" ? searchQuery : ""}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-green-600 text-sm"
          />

          <Link
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="relative text-xl text-gray-700 w-fit"
          >
            🛒
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {getCartCount()}
            </span>
          </Link>

          {!loading && !user && (
            <button
              onClick={() => {
                setShowUserLogin(true);
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white"
            >
              Login
            </button>
          )}

          {!loading && user && (
            <>
              <p
                onClick={() => {
                  navigate("/my-orders");
                  setIsMenuOpen(false);
                }}
                className="cursor-pointer text-gray-700 hover:text-green-600"
              >
                My Orders
              </p>
              <p
                onClick={handleLogout}
                className="cursor-pointer text-red-600"
              >
                Logout
              </p>
            </>
          )}
        </div>
      )}

      {showUserLogin && <Logins />}
    </>
  );
}

export default Sidebar;
