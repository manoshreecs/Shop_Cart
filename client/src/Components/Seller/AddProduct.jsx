import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useAppContext } from "../../context/AppContext"

const AddProduct = () => {
  const { backendUrl } = useAppContext()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Bakery")
  const [price, setPrice] = useState("")
  const [offerPrice, setOfferPrice] = useState("")
  const [images, setImages] = useState([null, null, null, null])
  const [loading, setLoading] = useState(false)

  const handleImageChange = (index, file) => {
    const newImages = [...images]
    newImages[index] = file
    setImages(newImages)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const productData = { name, description: description.split("\n"), category, price, offerPrice }
      const formData = new FormData()
      formData.append("productData", JSON.stringify(productData))
      images.forEach((img) => img && formData.append("images", img))

      const { data } = await axios.post(backendUrl + "/api/product/add", formData)
      
      if (data.success) {
        toast.success(data.message)
        setName("")
        setDescription("")
        setCategory("Bakery")
        setPrice("")
        setOfferPrice("")
        setImages([null, null, null, null])
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-full overflow-y-auto px-4 md:px-10">
      <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-3 w-full max-w-lg pb-20 mt-4 md:mt-8">
        
        <div className="w-full">
          <p className="text-sm font-medium mb-2">Product Image</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {images.map((img, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden bg-gray-50">
                  {img ? (
                    <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" alt="preview" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <span className="text-xl">☁️</span>
                      <span className="text-[10px]">Upload</span>
                    </div>
                  )}
                </div>
                <input type="file" id={`image${index}`} hidden onChange={(e) => handleImageChange(index, e.target.files[0])} />
              </label>
            ))}
          </div>
        </div>

        <div className="w-full">
          <p className="text-sm font-medium mb-1">Product Name</p>
          <input 
            type="text" 
            placeholder="Type here" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full outline-none py-2 px-3 rounded border border-gray-400 text-sm"
          />
        </div>

        <div className="w-full">
          <p className="text-sm font-medium mb-1">Product Description</p>
          <textarea 
            rows={3} 
            placeholder="Type here" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
            className="w-full outline-none py-2 px-3 rounded border border-gray-400 resize-none text-sm"
          ></textarea>
        </div>

        <div className="w-full">
          <p className="text-sm font-medium mb-1">Category</p>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="w-full outline-none py-2 px-3 rounded border border-gray-400 text-sm bg-white"
          >
            <option value="Bakery">Bakery</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Instant Food">Instant Food</option>
            <option value="Cold Drinks">Cold Drinks</option>
            <option value="Cereals & Grains">Cereals & Grains</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Product Price</p>
            <input 
              type="number" 
              placeholder="0" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              required 
              className="w-full outline-none py-2 px-3 rounded border border-gray-400 text-sm"
            />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Offer Price</p>
            <input 
              type="number" 
              placeholder="0" 
              value={offerPrice} 
              onChange={(e) => setOfferPrice(e.target.value)} 
              required 
              className="w-full outline-none py-2 px-3 rounded border border-gray-400 text-sm"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full sm:w-auto mt-4 px-12 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded shadow-md transition-all active:scale-95 disabled:bg-gray-400"
        >
          {loading ? "ADDING..." : "ADD PRODUCT"}
        </button>
      </form>
    </div>
  )
}

export default AddProduct