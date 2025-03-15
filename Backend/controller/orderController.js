const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const sqs = new AWS.SQS();
const QUEUE_URL = process.env.AWS_SQS_QUEUE_URL;

// create new order
exports.newOrder = async (req, res, next) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

        const orderData = {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        };

        const order = await Order.create(orderData);

        // Prepare Email Data
        const emailData = {
            email: req.user.email,
            subject: "Order Confirmation",
            html: `
                <p>Hello ${req.user.name},</p>
                <p>Thank you for your order!</p>
                <p>Your order has been placed successfully with the following details:</p>
                <ul>
                    <li><strong>Order ID:</strong> ${order._id}</li>
                    <li><strong>Total Price:</strong> $${order.totalPrice.toFixed(2)}</li>
                    <li><strong>Payment Status:</strong> ${order.paymentInfo.status}</li>
                </ul>
                <p>We appreciate your business and hope to serve you again!</p>
            `
        };

        const params = {
            MessageBody: JSON.stringify(emailData),
            QueueUrl: QUEUE_URL
        };

        await sqs.sendMessage(params).promise();

        res.status(201).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Order creation failed" });
    }
};


//get single order
exports.getSingleOrder = async (req,res,next)=>{
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler("Order not found with the Id",404));
    }

    res.status(200).json({
        success:true,
        order
    })
};

//get logged in user order
exports.myOrder = async (req,res,next)=>{
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
        success:true,
        orders
    })
};

