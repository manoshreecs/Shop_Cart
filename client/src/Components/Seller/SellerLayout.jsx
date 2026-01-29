import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast"

const SellerLayout = () => {
  const { axios, setIsSeller, backendUrl } = useAppContext()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/seller/logout")
      if (data.success) {
        setIsSeller(false)
        toast.success(data.message)
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const activeStyle = ({ isActive }) => `flex items-center gap-3 px-8 py-2 transition-all border-r-4 ${
    isActive ? "bg-green-50 border-green-600 text-green-600 font-medium" : "border-transparent text-gray-600 hover:bg-gray-50"
  }`

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between px-10 py-4 bg-white border-b border-gray-200">
        <div onClick={() => navigate("/")} className="flex items-center cursor-pointer">
          <span className="text-green-600 text-3xl font-bold">GreenCart</span>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-gray-500 text-sm">Hi! Admin</p>
          <button onClick={logout} className="border border-red-500 px-8 py-1.5 rounded-full text-sm text-red-600 hover:bg-red-50 transition-colors">Logout</button>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 min-h-[calc(100vh-80px)] border-r border-gray-100">
          <div className="flex flex-col pt-4">
            <NavLink className={activeStyle} to="/seller/add-product"><span className="text-lg">⊕</span><p className="text-sm">Add Product</p></NavLink>
            <NavLink className={activeStyle} to="/seller/product-list"><span className="text-lg">☰</span><p className="text-sm">Product List</p></NavLink>
            <NavLink className={activeStyle} to="/seller/orders"><span className="text-lg">☑</span><p className="text-sm">Orders</p></NavLink>
          </div>
        </div>

        <div className="flex-1 p-8 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SellerLayout
