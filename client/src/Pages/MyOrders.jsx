import React, { useEffect, useState } from "react"
import { useAppContext } from "../context/AppContext"
import { toast } from "react-hot-toast"

const MyOrders = () => {
  const { currency, loading, axios, user } = useAppContext()

  const [myOrders, setMyOrders] = useState([])
  const [fetching, setFetching] = useState(false)

  const fetchMyOrders = async () => {
    try {
      setFetching(true)

      const { data } = await axios.get("/api/order/user")

      if (data.success) {
        setMyOrders(data.orders)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyOrders()
    }
  }, [user])

  if (loading || fetching) {
    return (
      <div className="mt-16 flex justify-center items-center min-h-[40vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mt-16 text-center text-gray-500">
        Please login to view your orders
      </div>
    )
  }

  return (
    <div className="mt-16 pb-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-semibold uppercase text-black">
          My Orders
        </p>

        <div className="w-16 h-0.5 bg-green-600 rounded-full mt-1"></div>
      </div>

      <div className="w-full">

        {myOrders.length > 0 ? (

          myOrders.map((order, index) => (

            <div
              key={index}
              className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl shadow-sm"
            >

              <div className="flex justify-between md:items-center text-gray-400 font-medium max-md:flex-col gap-2 mb-4 text-sm border-b border-gray-200 pb-3">

                <p>
                  OrderId :
                  <span className="text-black font-semibold">
                    {" "}{order._id}
                  </span>
                </p>

                <p>
                  Payment :
                  <span className="text-black font-semibold">
                    {" "}{order.paymentType}
                  </span>
                </p>

                <p>
                  Total Amount :
                  <span className="text-black font-semibold">
                    {" "}{currency}{order.amount}
                  </span>
                </p>

              </div>

              {order.items.map((item, itemIdx) => (

                <div
                  key={itemIdx}
                  className={`flex flex-col md:flex-row md:items-center justify-between py-5 gap-6 w-full ${
                    order.items.length !== itemIdx + 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="bg-gray-100 p-3 rounded-lg">
                      <img
                        src={item.product.image[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-black">
                        {item.product.name}
                      </h2>

                      <p className="text-sm text-gray-500 font-medium">
                        Category: {item.product.category}
                      </p>
                    </div>

                  </div>

                  <div className="flex flex-col gap-1 text-sm text-black font-medium">

                    <p className="text-gray-400 font-normal text-xs uppercase">
                      Quantity :
                      <span className="text-black font-medium normal-case text-sm">
                        {" "}{item.quantity || 1}
                      </span>
                    </p>

                    <p className="text-gray-400 font-normal text-xs uppercase">
                      Status :
                      <span className="text-black font-medium normal-case text-sm">
                        {" "}{order.status}
                      </span>
                    </p>

                    <p className="text-gray-400 font-normal text-xs uppercase">
                      Date :
                      <span className="text-black font-medium normal-case text-sm">
                        {" "}{new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </p>

                  </div>

                  <div className="text-lg font-bold text-green-600">
                    Amount: {currency}
                    {item.product.offerPrice * (item.quantity || 1)}
                  </div>

                </div>
              ))}

            </div>
          ))

        ) : (

          <div className="py-20 text-center text-gray-500">
            No orders found
          </div>

        )}

      </div>
    </div>
  )
}

export default MyOrders
