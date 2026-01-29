import express from 'express'
import { addProduct, productList, productById, changeStock } from '../controllers/productController.js'
import upload from '../configs/multer.js'

const productRouter = express.Router()

productRouter.post('/add', upload.array('images', 4), addProduct)
productRouter.get('/list', productList)
productRouter.post('/id', productById)
productRouter.post('/stock', changeStock)

export default productRouter