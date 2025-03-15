import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "../CartComponents/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData/MetaData";
import "./ConfirmOrder.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getCartDetails } from "../../actions/cartActions";

const ShippingInfo = ({ user, shippingInfo, address }) => (
  <div className="confirmshippingArea">
    <Typography>Shipping Info</Typography>
    <div className="confirmshippingAreaBox">
      <div><p>Name:</p> <span>{user.name}</span></div>
      <div><p>Phone:</p> <span>{shippingInfo.phoneNo}</span></div>
      <div><p>Address:</p> <span>{address}</span></div>
    </div>
  </div>
);


const CartItemList = ({ cartItems }) => (
  <div className="confirmCartItems">
    <Typography>Your Cart Items:</Typography>
    <div className="confirmCartItemsContainer">
      {cartItems.map((item) => (
        <div key={item.product}>
          <img src={item.image} alt="Product" />
          <Link to={`/product/${item.product}`}>{item.name}</Link>
          <span>{item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b></span>
        </div>
      ))}
    </div>
  </div>
);

const OrderSummary = ({ subtotal, shippingCharges, tax, totalPrice, onProceed }) => (
  <div className="orderSummary">
    <Typography>Order Summary</Typography>
    <div>
      <div><p>Subtotal:</p> <span>₹{subtotal}</span></div>
      <div><p>Shipping Charges:</p> <span>₹{shippingCharges}</span></div>
      <div><p>GST:</p> <span>₹{tax}</span></div>
    </div>
    <div className="orderSummaryTotal">
      <p><b>Total:</b></p> <span>₹{totalPrice}</span>
    </div>
    <button onClick={onProceed}>Proceed To Payment</button>
  </div>
);

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartId } = useParams();
  const dispatch = useDispatch();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { cartDetails } = useSelector((state) => state.newcart);

  const [cartItemsToDisplay, setCartItemsToDisplay] = useState([]);

  useEffect(() => {
    if (cartId !== "myCart") {
      dispatch(getCartDetails(cartId));
    }
  }, [cartId, dispatch]);

  useEffect(() => {
    const fetchedCartItems = cartDetails?.products?.length
      ? cartDetails.products.map((item) => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.images[0].url,
          stock: item.product.stock,
          quantity: item.quantity,
        }))
      : [];

    setCartItemsToDisplay(cartId === "myCart" ? cartItems : fetchedCartItems);
  }, [cartDetails, cartItems, cartId]);

  const subtotal = cartItemsToDisplay.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    sessionStorage.setItem("orderInfo", JSON.stringify({ subtotal, shippingCharges, tax, totalPrice }));
    navigate(`/process/payment/${cartId === "myCart" ? "myCart" : cartId}`);
  };

  return (
    <Fragment>
      <section style={{ paddingTop: "120px" }}>
        <MetaData title="Confirm Order" />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
          <div>
            <ShippingInfo user={user} shippingInfo={shippingInfo} address={address} />
            <CartItemList cartItems={cartItemsToDisplay} />
          </div>
          <div>
            <OrderSummary
              subtotal={subtotal}
              shippingCharges={shippingCharges}
              tax={tax}
              totalPrice={totalPrice}
              onProceed={proceedToPayment}
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ConfirmOrder;
