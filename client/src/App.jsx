import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";

import Home from "./Pages/home";
import AllProducts from "./Pages/AllProducts";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import AddAddress from "./Pages/AddAddress";
import MyOrders from "./Pages/MyOrders";

import SellerLogin from "./Components/Seller/SellerLogin";
import { useAppContext } from "./context/AppContext";
import SellerLayout from "./Components/Seller/SellerLayout";
import AddProduct from "./Components/Seller/AddProduct";
import ProductList from "./Components/Seller/ProductList";
import Orders from "./Components/Seller/Orders";

import Loading from "./Components/Loading";



const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.startsWith("/seller");
  const { isSeller } = useAppContext();

  return (
    <div className="text-gray-700 bg-white relative">
      <Toaster position="top-center" reverseOrder={false} />

      {!isSellerPath && <Sidebar />}

      <div className={!isSellerPath ? "px-6 md:px-16 lg:px-24" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
           <Route path="/loader" element={<Loading/>} />
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
           
            <Route index element={<AddProduct />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
