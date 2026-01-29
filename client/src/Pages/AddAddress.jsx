import React, { useState } from 'react'
import locimage from '../assets/locimage.png'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-3 py-2.5 border border-gray-300 rounded outline-none text-gray-500 focus:border-green-600 transition text-sm"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
)

const AddAddress = () => {
  const { navigate, backendUrl, axios } = useAppContext()

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setAddress(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    try {
      const payload = {
        fullName: `${address.firstName} ${address.lastName}`,
        email: address.email,
        phone: address.phone,
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipcode,
        country: address.country
      }

      const { data } = await axios.post(
        backendUrl + '/api/address/add',
        payload,
        { withCredentials: true }
      )

      if (data.success) {
        toast.success(data.message)
        navigate('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="mt-16 pb-16 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col sm:flex-row items-start gap-2 mb-8">
        <p className="text-2xl md:text-3xl text-gray-500 uppercase tracking-tight">
          Add Shipping <span className="font-semibold text-green-600">Address</span>
        </p>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-12">
        <div className="flex-1 w-full max-w-[480px]">
          <form onSubmit={onSubmitHandler} className="space-y-4 mt-4">
            <div className="flex gap-3">
              <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
              <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
            </div>
            <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email address" />
            <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />
            <div className="flex gap-3">
              <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City" />
              <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
            </div>
            <div className="flex gap-3">
              <InputField handleChange={handleChange} address={address} name="zipcode" type="number" placeholder="Zip code" />
              <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
            </div>
            <InputField handleChange={handleChange} address={address} name="phone" type="number" placeholder="Phone" />
            <button type="submit" className="w-full bg-green-600 text-white py-3.5 rounded font-bold text-sm uppercase tracking-widest hover:bg-green-700 transition-all mt-6 shadow-sm cursor-pointer">
              Save Address
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex justify-end overflow-hidden">
          <img
            className="w-full max-w-[480px] object-contain opacity-95 transform md:translate-x-12 scale-90"
            src={locimage}
            alt="Add Address"
          />
        </div>
      </div>
    </div>
  )
}

export default AddAddress
