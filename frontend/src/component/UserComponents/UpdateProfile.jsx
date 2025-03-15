import React, { useState, useEffect, Fragment } from "react";
import "./UpdateProfile.css";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../MetaData/MetaData";
import { useNavigate } from "react-router-dom";
import { MailOutline, Face } from "@material-ui/icons";

const TextInput = ({ Icon, type, placeholder, name, value, onChange }) => (
  <div className="updateProfileField">
    <Icon />
    <input type={type} placeholder={placeholder} required name={name} value={value} onChange={onChange} />
  </div>
);

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || "", email: user.email || "" });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form className="updateProfileForm" onSubmit={updateProfileSubmit}>
                <TextInput Icon={Face} type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
                <TextInput Icon={MailOutline} type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />

                <input type="submit" value="Update" className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
