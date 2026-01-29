import express from "express"
import authUser from "../middleware/authUser.js"
import { addAddress, getAddress, deleteAddress } from "../controllers/addressController.js"

const router = express.Router()

router.post("/add", authUser, addAddress)
router.get("/list", authUser, getAddress)
router.post("/delete", authUser, deleteAddress)

export default router