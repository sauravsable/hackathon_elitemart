import React, { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData/MetaData";
import SetAvatar from "../SetAvatar/SetAvatar";
import profileImage from "../../images/Profile.png";
import "./Profile.css";

const ProfileInfo = ({ label, value }) => (
  <div>
    <h4>{label}</h4>
    <p>{value}</p>
  </div>
);

const Profile = () => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  if (loading) return <Loader />;

  return (
    <Fragment>
      <MetaData title={`${user?.name || "User"}'s Profile`} />
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src={user?.avatar?.url || profileImage} alt={user?.name || "User"} />
          <SetAvatar show={showAvatarModal} setShow={setShowAvatarModal} />
          <button className="profilechangebtn" onClick={() => setShowAvatarModal(true)}>
            Edit Profile Picture
          </button>
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <ProfileInfo label="Full Name" value={user?.name || "N/A"} />
          <ProfileInfo label="Email" value={user?.email || "N/A"} />
          <ProfileInfo label="Joined On" value={user?.createdAt ? String(user.createdAt).substr(0, 10) : "N/A"} />

          <div className="profileLinks">
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
            <Link to="/create/Cart">Create Cart</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
