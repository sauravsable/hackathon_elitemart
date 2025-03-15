const mongoose = require('mongoose');

// order details schema
const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        pinCode: { type: Number, required: true },
        phoneNo: { type: String, required: true, trim: true, match: /^[0-9]{10}$/ }
    },
    orderItems: [
        {
            name: { type: String, required: true, trim: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, min: 1 },
            image: { type: String, required: true, trim: true },
            product: { type: mongoose.Schema.ObjectId, ref: "products", required: true }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true
    },
    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true, enum: ["Pending", "succeeded", "Failed"] }
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    orderStatus: {
        type: String,
        required: true,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing"
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("orders", orderSchema);
