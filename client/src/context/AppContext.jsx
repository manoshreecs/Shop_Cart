import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

axios.defaults.withCredentials = true

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const currency = import.meta.env.VITE_CURRENCY || "₹"

  const [user, setUser] = useState(null)
  const [isSeller, setIsSeller] = useState(false)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserLogin, setShowUserLogin] = useState(false)

  const axiosInstance = axios.create({
    baseURL: backendUrl,
    withCredentials: true
  })

  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/is-auth")
      if (data.success) {
        setUser(data.user)
        setCartItems(data.user.cartData || {})
        setShowUserLogin(data.user.showUserLogin || false)
      } else {
        setUser(null)
        setCartItems({})
        setShowUserLogin(false)
      }
    } catch {
      setUser(null)
      setCartItems({})
      setShowUserLogin(false)
    }
  }

  useEffect(() => {
    if (user) {
      axiosInstance.post("/api/user/update-show-login", { showUserLogin })
        .catch(err => console.error(err.message))
    }
  }, [showUserLogin])

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/api/product/list")
      if (data.success) setProducts(data.products)
    } catch {
      toast.error("Backend not connected")
    }
  }

  const addToCart = async (itemId) => {
    const updatedCart = { ...cartItems }
    updatedCart[itemId] = (updatedCart[itemId] || 0) + 1
    setCartItems(updatedCart)
    toast.success("Added to cart")
    if (user) await axiosInstance.post("/api/cart/update", { cartItems: updatedCart })
  }

  const updateCartItem = async (itemId, quantity) => {
    const updatedCart = { ...cartItems }
    if (quantity <= 0) delete updatedCart[itemId]
    else updatedCart[itemId] = quantity
    setCartItems(updatedCart)
    if (user) await axiosInstance.post("/api/cart/update", { cartItems: updatedCart })
  }

  const getCartCount = () => {
    let count = 0
    for (const item in cartItems) count += cartItems[item]
    return count
  }

  const getCartAmount = () => {
    let total = 0
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId)
      if (product) total += product.offerPrice * cartItems[itemId]
    }
    return total
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await Promise.all([fetchProducts(), fetchUser()])
      setLoading(false)
    }
    init()
  }, [])

  return (
    <AppContext.Provider
      value={{
        navigate,
        axios: axiosInstance,
        backendUrl,
        currency,
        user,
        setUser,
        isSeller,
        setIsSeller,
        products,
        cartItems,
        setCartItems,
        addToCart,
        updateCartItem,
        getCartCount,
        getCartAmount,
        loading,
        searchQuery,
        setSearchQuery,
        showUserLogin,
        setShowUserLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
