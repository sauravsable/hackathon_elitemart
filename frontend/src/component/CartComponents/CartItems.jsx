import React,{useEffect} from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { clearErrors } from "../../actions/cartActions";
import { REMOVE_PRODUCT_FROM_CART_RESET } from "../../constants/cartConstants";
import { useAlert } from "react-alert";

const CartItems = ({ item, deleteCartProduct}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { isRemoved, error} = useSelector((state) => state.cartProduct);

    useEffect(() => {
      if(error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if(isRemoved) {
        alert.success("Product Removed Successfully");
        dispatch({ type: REMOVE_PRODUCT_FROM_CART_RESET });
      }
    },[dispatch, error, alert,isRemoved]);
  return (
    <div className="CartItemCard">
      <img src={item.images[0].url} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartProduct(item._id)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItems;