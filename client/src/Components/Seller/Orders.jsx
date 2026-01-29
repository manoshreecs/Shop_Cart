import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Orders = () => {

  const { currency, backendUrl, axios } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/order/seller')
      if (data.success) {
        setOrders(data.orders)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800 bg-white shadow-sm">
              
              <div className="flex gap-5 max-w-80">
                <div className="flex -space-x-3 overflow-hidden">
                  {order.items.map((item, itemIndex) => (
                    <img 
                      key={itemIndex}
                      className="w-12 h-12 object-cover rounded-full border-2 border-white" 
                      src={item.product.image[0]} 
                      alt={item.product.name} 
                    />
                  ))}
                </div>
                <div className="flex flex-col justify-center">
                  {order.items.map((item, itemIndex) => (
                    <p key={itemIndex} className="font-medium text-sm md:text-base">
                      {item.product.name}
                      <span className="text-green-600"> x {item.quantity}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="text-sm md:text-base text-black/60">
                <p className="text-black/80 font-medium">Customer Address</p>
              
                <p className="truncate">{order.address.street}, {order.address.city}</p>
              </div>

              <p className="font-medium text-lg text-black/70">
                {currency}{order.amount}
              </p>

              <div className="flex flex-col text-sm md:text-base text-black/60">
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: {order.payment ? "Paid" : "Pending"}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500">
            No seller orders found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders