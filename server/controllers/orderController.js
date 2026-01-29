import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = async(items) => {
    let amount = 0;

    for (const item of items) {
        const product = await Product.findById(item.product);

        if (!product) {
            throw new Error(`Product ${item.product} not found`);
        }

        amount += product.offerPrice * item.quantity;
    }

    const tax = Math.floor(amount * 0.02);
    return amount + tax;
};

export const placeOrderCOD = async(req, res) => {
    try {
        const userId = req.userId;
        const { items, address } = req.body;

        if (!userId) {
            return res.json({
                success: false,
                message: "Not Authorized"
            });
        }

        if (!items || items.length === 0) {
            return res.json({
                success: false,
                message: "Cart is empty"
            });
        }

        const totalAmount = await calculateOrderAmount(items);

        const order = await Order.create({
            userId,
            items,
            amount: totalAmount,
            address,
            paymentType: "COD",
            isPaid: false
        });

        res.json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const placeOrderStripe = async(req, res) => {
    try {
        const userId = req.userId;
        const { items, address } = req.body;
        const origin = req.headers.origin;

        if (!userId) {
            return res.json({
                success: false,
                message: "Not Authorized"
            });
        }

        const totalAmount = await calculateOrderAmount(items);

        const order = await Order.create({
            userId,
            items,
            amount: totalAmount,
            address,
            paymentType: "Online",
            isPaid: false
        });

        const line_items = await Promise.all(
            items.map(async(item) => {
                const product = await Product.findById(item.product);

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name
                        },
                        unit_amount: product.offerPrice * 100
                    },
                    quantity: item.quantity
                };
            })
        );

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/verify?success=true&orderId=${order._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${order._id}`
        });

        res.json({
            success: true,
            session_url: session.url
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const getUserOrders = async(req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.json({
                success: false,
                message: "Not Authorized"
            });
        }

        const orders = await Order.find({ userId })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            orders
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find()
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            orders
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const updateStatus = async(req, res) => {
    try {
        const { orderId, status } = req.body;

        await Order.findByIdAndUpdate(orderId, { status });

        res.json({
            success: true,
            message: "Status Updated"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};