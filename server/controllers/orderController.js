import Order from "../models/Order.js";

import Product from "../models/Product.js";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helper to calculate total order amount with 2% tax
const calculateOrderAmount = async(items) => {
    let amount = 0;
    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) throw new Error(`Product ${item.product} not found`);
        amount += product.offerPrice * item.quantity;
    }
    const tax = Math.floor(amount * 0.02);
    return amount + tax;
};

// Place COD Order
export const placeOrderCOD = async(req, res) => {
    try {
        const userId = req.user.id;
        const { items, address } = req.body;

        if (!items || items.length === 0) {
            return res.json({ success: false, message: "Cart is empty" });
        }

        const totalAmount = await calculateOrderAmount(items);

        const order = await Order.create({
            userId,
            items,
            amount: totalAmount,
            address,
            paymentType: "COD",
            payment: false,
            date: Date.now()
        });

        res.json({ success: true, message: "Order placed successfully", order });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Place Stripe Order
export const placeOrderStripe = async(req, res) => {
    try {
        const userId = req.user.id;
        const { items, address } = req.body;
        const origin = req.headers.origin;

        const totalAmount = await calculateOrderAmount(items);

        const order = await Order.create({
            userId,
            items,
            amount: totalAmount,
            address,
            paymentType: "Online",
            payment: false,
            date: Date.now()
        });

        const line_items = await Promise.all(items.map(async(item) => {
            const product = await Product.findById(item.product);
            return {
                price_data: {
                    currency: "usd",
                    product_data: { name: product.name },
                    unit_amount: product.offerPrice * 100
                },
                quantity: item.quantity
            };
        }));

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${order._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get Orders for Logged-in User
export const getUserOrders = async(req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .populate("items.product")
            .sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get All Orders (Seller/Admin)
export const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find()
            .populate("items.product")
            .sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update Order Status
export const updateStatus = async(req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};