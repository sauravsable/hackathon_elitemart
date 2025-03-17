const ErrorHandler = require("../utils/errorHandler");
const Cart = require('../models/cartModel');
const crypto = require("crypto");
const User = require('../models/userModel');
const { sendMail } = require("../utils/mail");
const Message =  require('../models/messageModel');

// creating new cart
exports.addCart = async (req, res, next) => {

    const { cartname } = req.body;

    if (!cartname) {
        return next(new ErrorHandler("Please Enter Cart Name", 400));
    }

    const existingCart = await Cart.findOne({ userId: req.user._id, cartName: cartname });

    if (existingCart) {
        return next(new ErrorHandler("Please try a different name", 400));
    }

    await Cart.create({
        userId: req.user._id,
        cartName: cartname,
        members: [{ user: req.user._id , status:"accepted",role:"admin"}] 
    });

    res.status(200).json({
        success: true,
        message: "Cart Created Successfully"
    });
};

// removing cart
exports.removeCart = async (req, res, next) => {
  try{
    const { cartId } = req.body;
    console.log("cartId ",cartId);
    
    const cart = await Cart.findOne({ _id : cartId });
  
    if (!cart) {
        return next(new ErrorHandler("Cart Not Found", 400));
    }
  
    await Cart.findByIdAndDelete(cartId);
    await Message.findByIdAndDelete(cartId);
  
    res.status(200).json({
        success: true,
        message: "Cart Deleted Successfully"
    });
  }
  catch(error){
    console.error(error);
    return next(new ErrorHandler("Error Deleting carts", 500));
  }
 
};

// get all the carts of logged in user
exports.getCarts = async (req, res, next) => {
try {
    const carts = await Cart.find({
        "members": {
            $elemMatch: {
                user: req.user._id,
                status: 'accepted'
            }
        }
    });

    if (carts.length === 0) {
        return next(new ErrorHandler("No Carts Found", 400));
    }

    res.status(200).json({
        success: true,
        carts: carts
    });
} catch (error) {
    console.error(error);
    return next(new ErrorHandler("Error retrieving carts", 500));
}
};

// get the single cart information
exports.getCartDetails = async (req, res, next) => {
  try {
      console.log("Fetching cart with ID:", req.params.id);

      const cartDetails = await Cart.findById(req.params.id)
          .populate('members.user', 'name email avatar')
          .populate('products.product','name price images stock');

      if (!cartDetails) {
          console.log("No cart details found for ID:", req.params.id);
          return next(new ErrorHandler("Cart Details Not Found", 400));
      }

      res.status(200).json({
          success: true,
          cartDetails
      });
  } catch (error) {
      console.error("Error fetching cart details:", error);
      next(error);
  }
};

// send invitation to user to add into cart
exports.sendInvitation = async (req, res, next) => {
  const { cartId, userEmail, userId } = req.body;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return next(new ErrorHandler("Cart Not Found", 400));
    }

    const isUserPresent = cart.members.some(
      (member) => member.user.toString() === userId.toString()
    );

    if (isUserPresent) {
      return next(new ErrorHandler("Already Requested Or Already a Member.", 400));
    }

    const token = crypto.randomBytes(20).toString("hex");

    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorHandler("User Not Found", 400));
    }

    const encodedCartName = encodeURIComponent(cart.cartName);
    const encodedUsername = encodeURIComponent(user.name);

    const emailResult = await sendMail({
      email: userEmail,
      subject: "Cart Invitation",
      html: `
        <p>Hello,</p>
        <p>${user.name} has invited you to join the cart named "${cart.cartName}".</p>
        <p>Click the button below to accept the invitation:</p>
        <a href="http://localhost:3000/accept-invitation?cartId=${cartId}&token=${token}&userId=${userId}&cartName=${encodedCartName}&username=${encodedUsername}" 
        style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none;">Accept Invitation</a>
      `,
    });

    cart.members.push({ user: userId, status: "pending", token });
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Invitation Sent Successfully",
    });
  } catch (error) {
    console.error("Error in sendInvitation:", error);
    return next(new ErrorHandler("Error sending invitation", 500));
  }
};


// remove user from the cart only cart admin can remove
exports.removeUserFromCart = async (req, res, next) => {
  const { cartId, userId } = req.body;

  try {
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return next(new ErrorHandler("Cart Not Found", 400));
    }

    const memberIndex = cart.members.findIndex(member => member.user.toString() === userId);
    if (memberIndex === -1) {
      return next(new ErrorHandler("User not a member of the cart", 400));
    }

    cart.members.splice(memberIndex, 1);

    await cart.save();

    res.status(200).json({
      success: true,
      message: "User removed from the cart successfully"
    });

  } catch (error) {
    return next(new ErrorHandler("Error removing user from cart", 500));
  }
};

// add new product to the cart
exports.addProductToCart = async(req,res,next)=>{
    const { cartId, productId,quantity } = req.body;

    console.log(cartId,productId,quantity);
    

      const cart = await Cart.findById(cartId);

        if (!cart) {
          return next(new ErrorHandler("Cart Not Found", 400));
        }

        const existingProductIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity = quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();

        res.status(200).json({
           success:true,
           message: 'Product added/updated in the cart' 
        });

}

// remove product from the cart
exports.removeProductFromCart = async (req, res, next) => {
  const { cartId, productId } = req.body;

  if (!cartId || !productId) {
      return next(new ErrorHandler("Cart ID and Product ID are required", 400));
  }

  try {
      const cart = await Cart.findById(cartId);

      if (!cart) {
          return next(new ErrorHandler("Cart Not Found", 404));
      }

      const productIndex = cart.products.findIndex(
          (item) => item.product.toString() === productId
      );

      if (productIndex === -1) {
          return next(new ErrorHandler("Product Not Found in Cart", 404));
      }

      cart.products.splice(productIndex, 1);

      await cart.save();

      res.status(200).json({
          success: true,
          message: 'Product removed from the cart',
      });
  } catch (error) {
      return next(new ErrorHandler(error.message, 500));
  }
};

exports.removeAllProductsFromCart = async (req, res, next) => {
  try {
    const { cartId } = req.body;
    
    if (!cartId) {
      return next(new ErrorHandler("Cart ID is required", 400));
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return next(new ErrorHandler("Cart Not Found", 404));
    }

    if (cart.products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is already empty",
      });
    }

    await Cart.updateOne({ _id: cartId }, { $set: { products: [] } }).exec();

    res.status(200).json({
      success: true,
      message: "All products removed from the cart",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};


// accept the cart invitation
exports.acceptInvitation = async (req, res,next) => {
  const { cartId, userId, token } = req.body;
  try {
    const cart = await Cart.findOne({ _id: cartId, 'members.user': userId, 'members.token': token });

    if (!cart) {
      return next(new ErrorHandler("Invalid cart, user, or token", 404));
    }
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartId, 'members.user': userId, 'members.token': token },
      { 
        $set: { 'members.$.status': 'accepted' },
        $unset: { 'members.$.token': "" }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Invitation Accepted',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// cancle the cart invitation
exports.cancelInvitation = async (req, res,next) => {
  const { cartId, userId, token } = req.body;

  try {
    const cart = await Cart.findOne({ _id: cartId, 'members.user': userId, 'members.token': token });

    if (!cart) {
      return next(new ErrorHandler("Invalid cart, user, or token", 404));
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartId, 'members.user': userId, 'members.token': token },
      { 
        $set: { 'members.$.status': 'canceled' },
        $unset: { 'members.$.token': "" }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Invitation Accepted',
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
