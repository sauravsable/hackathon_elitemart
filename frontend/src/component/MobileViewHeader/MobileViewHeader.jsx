import "./MobileViewHeader.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits, MdOutlineShoppingCart, MdOutlineAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";

export default function MobileViewHeader() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="mobileviewheader">
      <div className="mobileviewheader-row">
        <NavItem to="/" Icon={FaHome} />
        <NavItem to="/products" Icon={MdOutlineProductionQuantityLimits} />
        <NavItem to="/cart" Icon={MdOutlineShoppingCart} cartCount={cartItems.length} />
        <NavItem to="/login" Icon={MdOutlineAccountCircle} />
      </div>
    </div>
  );
}

// Reusable Nav Item Component
const NavItem = ({ to, Icon, cartCount }) => (
  <div className="nav-item">
    <Link to={to} className="nav-link">
      <Icon className="nav-icon" />
      {cartCount !== undefined && <span className="cart-count">{cartCount}</span>}
    </Link>
  </div>
);
