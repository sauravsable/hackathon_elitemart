import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "../UserOptions/UserOptions";
import Search from "../SearchBar/SearchBar";
import CartOptions from "../GroupCartComponents/GroupCartOptions";

const TopBar = ({ isAuthenticated, user }) => (
  <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
    <div className="col-lg-4 px-5 text-start">
      <p className="mb-0">
        Let's talk! <strong>+57 444 11 00 35</strong>
      </p>
    </div>
    <div className="col-lg-4 lg:px-5 text-center">
      <p className="mb-0">Free shipping on a purchase value of $200</p>
    </div>
    <div className="col-lg-4 d-flex justify-content-end align-items-center px-5 text-end">
      {isAuthenticated ? <UserOptions user={user} /> : <Link className="ms-3" to="/login" style={{ color: "white" }}>Login</Link>}
    </div>
  </div>
);

const CartIcon = ({ isAuthenticated, cartLength, toggleDropdown }) => (
  <div className="carticondiv carticondiv1">
    {isAuthenticated ? (
      <button className="cartlink text-body ms-3" style={{ border: "none" }} onClick={toggleDropdown}>
        <MdOutlineShoppingCart />
        <span>{cartLength}</span>
      </button>
    ) : (
      <Link to="/cart" className="cartlink text-body ms-3">
        <MdOutlineShoppingCart />
        <span>{cartLength}</span>
      </Link>
    )}
  </div>
);

const Navbar = ({ isAuthenticated, user, cartLength, toggleDropdown, open, setOpen }) => (
  <div className="navbarcontainer">
    <div className="col-xl-6 col-4">
      <Link to="/" className="logoimg">EliteMart</Link>
    </div>
    <div className="nav-elements d-flex col-xl-6 col-8">
      <Search />
      <CartIcon isAuthenticated={isAuthenticated} cartLength={cartLength} toggleDropdown={toggleDropdown} />
      {isAuthenticated && <CartOptions user={user} open={open} setOpen={setOpen} />}
    </div>
  </div>
);

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { cartDetails } = useSelector((state) => state.newcart);
  const location = useLocation();

  const isCartPageWithId = /^\/cart\/[^/]+$/.test(location.pathname);
  const cartLength = isCartPageWithId ? cartDetails?.products?.length || 0 : cartItems.length;

  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const header = document.querySelector(".fixed-top");
    const handleScroll = () => {
      if (!header) return;
      if (window.scrollY > 45) {
        header.classList.add("bg-white", "shadow");
        if (window.innerWidth >= 992) header.style.top = "-45px";
      } else {
        header.classList.remove("bg-white", "shadow");
        if (window.innerWidth >= 992) header.style.top = "0";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container-fluid fixed-top px-0" data-wow-delay="0.1s">
      <TopBar isAuthenticated={isAuthenticated} user={user} />
      <Navbar isAuthenticated={isAuthenticated} user={user} cartLength={cartLength} toggleDropdown={toggleDropdown} open={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;
