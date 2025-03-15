import React from "react";
import "./GroupCartOptions.css";
import { TbShoppingCartShare } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartLink = ({ to, label, onClick }) => (
  <li className="profile-dropdown-list-item1">
    <Link to={to} onClick={onClick} className="cart-link">
      <TbShoppingCartShare /> {label}
    </Link>
  </li>
);

const GroupCartOptions = ({ open, setOpen }) => {
  const { carts } = useSelector((state) => state.newcart);

  if (!open) return null;

  return (
    <div className="profile-dropdown">
      <ul className="profile-dropdown-list1">
        <CartLink to="/cart" label="My Cart" onClick={() => setOpen(false)} />
        {carts?.length > 0 &&
          carts.map((cart) => (
            <CartLink key={cart?._id} to={`/cart/${cart._id}`} label={cart.cartName} onClick={() => setOpen(false)} />
          ))}
      </ul>
    </div>
  );
};

export default GroupCartOptions;
