const mongoose = require('mongoose');

// cart schema, less members and products so storing it into array
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true
    },
    cartName: {
        type: String,
        required: true,
        unique: true
    },
    members: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "users",
            },
            status: {
                type: String,
                enum: ['pending', 'accepted'], 
                default: 'pending'
            },
            role: {
                type: String,
                enum: ['admin', 'member'],
            },
            token: {
                type: String,
                default:"123"
            }
        }
    ],
    products: [
        {
            product : {
                type: mongoose.Schema.ObjectId,
                ref: "products",
            },
            quantity : {
                type : Number,
                required : true
            }    
        }
    ]
});

module.exports = mongoose.model("carts", cartSchema);
