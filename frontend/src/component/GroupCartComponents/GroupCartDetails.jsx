import React, { Fragment, useEffect } from "react";
import "./GroupCartDetails.css";
import "../CartComponents/Cart.css";
import CartItems from "../CartComponents/CartItems";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart, removeProductFromCart, getCartDetails, clearErrors, getCarts, addProductToCart } from "../../actions/cartActions";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers } from "../../actions/userActions";
import Members from "./GroupCartMembers";
import Chat from "./GroupCartChat";
import NoProduct from "../NoProduct/NoProduct";
import { REMOVE_CART_RESET } from "../../constants/cartConstants";
import MetaData from "../MetaData/MetaData";
import { useAlert } from "react-alert";

const CartProductItem = ({ item, cartId, increaseQuantity, decreaseQuantity, deleteCartProduct }) => (
  <div className="cartContainer" key={item.product._id}>
    <CartItems item={item.product} deleteCartProduct={deleteCartProduct} cartId={cartId} />
    <div className="cartInput">
      <button onClick={() => decreaseQuantity(item.product._id, item.quantity)}>-</button>
      <input type="number" value={item?.quantity} readOnly />
      <button onClick={() => increaseQuantity(item.product._id, item.quantity, item.product.stock)}>+</button>
    </div>
    <p className="cartSubtotal">{`₹${item.product.price * item.quantity}`}</p>
  </div>
);

const CartSummary = ({ totalAmount, onCheckout }) => (
  <div className="cartGrossProfit">
    <div></div>
    <div className="cartGrossProfitBox">
      <p>Gross Total</p>
      <p>{`₹${totalAmount}`}</p>
    </div>
    <div></div>
    <div className="checkOutBtn">
      <button onClick={onCheckout}>Check Out</button>
    </div>
  </div>
);

// Reusable Cart Actions Component
const CartActions = ({ isAdmin, handleRemoveCart }) => (
  isAdmin && (
    <div className="removeCartDiv">
      <button className="removeCartButton" onClick={handleRemoveCart}>Remove Cart</button>
    </div>
  )
);

const GroupCartDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { cartDetails, error } = useSelector((state) => state.newcart);
  const { isCartDeleted, error: cartDeleteError } = useSelector((state) => state.cartProduct);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCartDetails(id));
    dispatch(getAllUsers());
  }, [dispatch, id]);

  useEffect(() => {
    if (cartDeleteError) {
      alert.error(cartDeleteError);
      dispatch(clearErrors());
    }

    if (isCartDeleted) {
      alert.success("Cart Deleted Successfully");
      navigate("/account");
      dispatch({ type: REMOVE_CART_RESET });
      dispatch(getCarts());
    }
  }, [dispatch, error, isCartDeleted, cartDeleteError, navigate, alert]);

  const increaseQuantity = async (productId, quantity, stock) => {
    if (stock <= quantity) return;
    await dispatch(addProductToCart({ cartId: id, productId, quantity: quantity + 1 }));
    dispatch(getCartDetails(id));
  };

  const decreaseQuantity = async (productId, quantity) => {
    if (quantity <= 1) return;
    await dispatch(addProductToCart({ cartId: id, productId, quantity: quantity - 1 }));
    dispatch(getCartDetails(id));
  };

  const deleteCartProduct = async (productId) => {
    await dispatch(removeProductFromCart({ cartId: id, productId }));
    dispatch(getCartDetails(id));
  };

  const checkoutHandler = () => {
    navigate(`/shipping/${id}`);
  };

  const handleRemoveCart = (e) => {
    e.preventDefault();
    dispatch(deleteCart({ cartId: id }));
  };

  const loggedInUser = cartDetails?.members?.find((member) => member.user._id === user?._id);
  const isAdmin = loggedInUser?.role === "admin";

  const totalAmount = cartDetails?.products?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  ) || 0;

  return (
    <Fragment>
      <MetaData title="Cart" />
      {cartDetails?.products?.length === 0 ? (
        <NoProduct cartName={cartDetails?.cartName} />
      ) : (
        <Fragment>
          <div className="cartPage">
            <h2 className="homeheading" style={{ textTransform: "capitalize" }}>{cartDetails.cartName}</h2>
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartDetails?.products?.map((item) => (
              <CartProductItem
                key={item.product._id}
                item={item}
                cartId={id}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                deleteCartProduct={deleteCartProduct}
              />
            ))}

            <CartSummary totalAmount={totalAmount} onCheckout={checkoutHandler} />
          </div>
        </Fragment>
      )}

      <div className="cartusersdiv">
        <Members id={id} />
        <div className="usersdiv">
          <h2 className="homeheading" style={{ textTransform: "capitalize" }}>Chat With Cart Members</h2>
          <Chat roomId={id} />
        </div>
      </div>

      <CartActions isAdmin={isAdmin} handleRemoveCart={handleRemoveCart} />
    </Fragment>
  );
};

export default GroupCartDetails;
