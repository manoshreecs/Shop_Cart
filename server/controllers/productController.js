import Product from "../models/Product.js"
import { v2 as cloudinary } from "cloudinary"

export const addProduct = async(req, res) => {
    try {
        const { productData } = req.body
        const parsedData = JSON.parse(productData)

        const imageFiles = req.files || []

        const imagesUrl = await Promise.all(
            imageFiles.map(async(item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )

        const product = new Product({
            ...parsedData,
            image: imagesUrl,
            price: Number(parsedData.price),
            offerPrice: Number(parsedData.offerPrice)
        })

        await product.save()
        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const productList = async(req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const productById = async(req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export const changeStock = async(req, res) => {
    try {
        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true, message: "Stock Updated" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}