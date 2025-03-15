const mongoose = require("mongoose");

// Schema to store messages of the cart
const messageSchema = new mongoose.Schema({
    roomId: String,
    text: String,
    senderId: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
    timestamp: { type: Date, default: Date.now },
  });
  
module.exports = new mongoose.model("Message", messageSchema);