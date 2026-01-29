import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import Stripe from "stripe";
import { createServer } from "http";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const allowedOrigins = [
    "http://localhost:5173",
    "https://shop-cart-ecommerce-hazel.vercel.app"
];

await connectDB();
connectCloudinary();

app.post(
    "/stripe",
    express.raw({ type: "application/json" }),
    async(req, res) => {
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            return res.json({ received: true });
        }

        const sig = req.headers["stripe-signature"];

        try {
            stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );

            res.json({ received: true });
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
);

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS not allowed"));
            }
        },
        credentials: true
    })
);

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
    res.send("API is working 🚀");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default (req, res) => {
    createServer(app).emit("request", req, res);
};