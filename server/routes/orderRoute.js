import express from "express"
import authUser from "../middleware/authUser.js"
import authSeller from "../middleware/authSeller.js"
import {
    getAllOrders,
    getUserOrders,
    placeOrderCOD,
    placeOrderStripe,
    updateStatus
} from "../controllers/orderController.js"

const orderRouter = express.Router()

orderRouter.post("/cod", authUser, placeOrderCOD)
orderRouter.get("/user", authUser, getUserOrders)
orderRouter.get("/seller", authSeller, getAllOrders)


orderRouter.post("/stripe", authUser, placeOrderStripe)

orderRouter.post("/update-status", authSeller, updateStatus)

export default orderRouter