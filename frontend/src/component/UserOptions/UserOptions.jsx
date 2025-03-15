import React, { useState } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { FaHome } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import "./useroptions.css";
import { Link } from "react-router-dom";

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
    alert.success("Logout Successfully");
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };


  return (
    <div className="profile-dropdown">
      
      <div onClick={toggleDropdown} className="profile-dropdown-btn">
        <p>{user.name}</p>
        {open === false ?
          <IoMdArrowDropdown/>
          :
          <IoMdArrowDropup/>
        }
       
        {/* <div className="profile-img">
          <img className="profileimage" src={user.avatar.url} alt="userprofile" />
        </div> */}
      </div>


      {open && (
        <ul className="profile-dropdown-list">
           <li className="profile-dropdown-list-item">
            <Link to="/" onClick={()=>{setOpen(false)}}>
            <FaHome/> Home
            </Link>
          </li>
          {
            user.role === "admin" && 
            <li className="profile-dropdown-list-item">
            <Link to="/admin/product" onClick={()=>{setOpen(false)}}>
            <DashboardIcon/> Add Product
            </Link>
            </li>
          }
          <li className="profile-dropdown-list-item">
            <Link to="/account" onClick={()=>{setOpen(false)}}>
            <PersonIcon/> Profile
            </Link>
          </li>

          <li className="profile-dropdown-list-item">
            <Link to="/orders"  onClick={()=>{setOpen(false)}}>
            <ListAltIcon/> Orders
            </Link>
          </li>

          <hr />

          <li className="profile-dropdown-list-item" onClick={logoutUser}>
              <ExitToAppIcon/> Log out
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserOptions;
