import React, { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import { toast } from "react-hot-toast"
import axios from "axios"

const Cart = () => {
  const { products, currency, cartItems, setCartItems, getCartCount, updateCartItem, navigate, getCartAmount, user, backendUrl } = useAppContext()
  const [cartArray, setCartArray] = useState([])
  const [addresses, setAddresses] = useState([])
  const [showAddress, setShowAddress] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState(null)
  const [paymentOption, setPaymentOption] = useState("COD")

  useEffect(() => {
    const temp = []
    for (const key in cartItems) {
      if (cartItems[key] > 0) {
        const product = products.find(p => p._id === key)
        if (product) temp.push({ ...product, quantity: cartItems[key] })
      }
    }
    setCartArray(temp)
  }, [cartItems, products])

  useEffect(() => {
    if (!user) {
      setAddresses([])
      setSelectedAddressId(null)
      return
    }
    const load = async () => {
      const { data } = await axios.get(backendUrl + "/api/address/list", { withCredentials: true })
      if (data.success) {
        setAddresses(data.addresses)
        if (data.addresses.length) setSelectedAddressId(data.addresses[data.addresses.length - 1]._id)
      }
    }
    load()
  }, [user])

  const selectedAddress = addresses.find(a => a._id === selectedAddressId)

  const onSubmitHandler = async () => {
    if (!selectedAddress) return toast.error("Please select an address")

    const orderData = {
      items: cartArray.map(item => ({ product: item._id, quantity: item.quantity })),
      address: selectedAddressId
    }

    if (paymentOption === "COD") {
      const { data } = await axios.post(backendUrl + "/api/order/cod", orderData, { withCredentials: true })
      if (data.success) {
        toast.success(data.message)
        setCartItems({})
        navigate("/my-orders")
      } else toast.error(data.message)
    } else {
      // Online Payment logic
      try {
        const { data } = await axios.post(backendUrl + '/api/order/stripe', {
          ...orderData,
          userId: user._id
        }, { withCredentials: true })

        if (data.success) {
          window.location.replace(data.session_url) // Redirect to Stripe
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="pt-10">
      <div className="flex flex-col sm:flex-row gap-10 justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold uppercase text-[#374151] mb-8">
            SHOPPING CART
            <span className="text-[#059669] font-medium text-sm ml-2">{getCartCount()} Items</span>
          </h1>
          {cartArray.length === 0 ? (
            <div className="py-20 flex flex-col items-center">
              <p className="text-gray-400 mb-4">Your cart is empty</p>
              <button onClick={() => navigate("/products")} className="bg-[#00ab4f] text-white px-10 py-3 rounded-md font-bold text-sm">Shop Now</button>
            </div>
          ) : (
            cartArray.map(item => (
              <div key={item._id} className="flex justify-between items-center border-b py-4">
                <div className="flex gap-4 items-center">
                  <img src={item.image[0]} className="w-20 border rounded p-1" alt="" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <select value={item.quantity} onChange={e => updateCartItem(item._id, Number(e.target.value))} className="border mt-1">
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <p>{currency}{item.offerPrice * item.quantity}</p>
                <button onClick={() => updateCartItem(item._id, 0)}>✕</button>
              </div>
            ))
          )}
        </div>
        <div className="max-w-[360px] w-full p-6 border">
          <p className="text-sm text-gray-500 mb-1">DELIVERY TO</p>
          <p className="text-sm mb-2">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}` : "Select Address"}</p>
          <button onClick={() => setShowAddress(v => !v)} className="text-green-600 text-xs font-bold">CHANGE</button>
          
          {showAddress && (
            <div className="border mt-2">
              {addresses.map(addr => (
                <div key={addr._id} onClick={() => { setSelectedAddressId(addr._id); setShowAddress(false) }} className="p-2 cursor-pointer hover:bg-gray-50">
                  <p className="text-sm">{addr.fullName}</p>
                  <p className="text-xs text-gray-400">{addr.street}, {addr.city}</p>
                </div>
              ))}
              <div onClick={() => navigate("/add-address")} className="p-3 text-sm font-bold text-green-600 cursor-pointer hover:bg-gray-50">+ Add New Address</div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm mb-2">PAYMENT METHOD</p>
            <select value={paymentOption} onChange={e => setPaymentOption(e.target.value)} className="w-full border p-2 text-sm mb-4">
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
            <p className="text-sm mb-3">Total: {currency}{getCartAmount()}</p>
            <button onClick={onSubmitHandler} className="w-full bg-[#00ab4f] text-white py-3 font-bold">
              {paymentOption === "COD" ? "Place Order" : "Proceed to Pay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart