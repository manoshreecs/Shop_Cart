import express from "express";
import { registerUser, loginUser, logout } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", authUser, logout);

router.get("/is-auth", authUser, async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.json({ success: false });
        res.json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                cartData: user.cartData,
                showUserLogin: user.showUserLogin
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post("/update-show-login", authUser, async(req, res) => {
    try {
        const { showUserLogin } = req.body;
        const user = await User.findByIdAndUpdate(req.userId, { showUserLogin }, { new: true });
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;