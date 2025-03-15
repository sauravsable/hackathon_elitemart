import React, { useState, useEffect, Fragment } from "react";
import "./UpdatePassword.css";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../MetaData/MetaData";
import { useNavigate } from "react-router-dom";
import { VpnKey, LockOpen, Lock } from "@material-ui/icons";

const PasswordInput = ({ Icon, placeholder, value, onChange }) => (
  <div className="loginPassword">
    <Icon />
    <input type="password" placeholder={placeholder} required value={value} onChange={onChange} />
  </div>
);

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { oldPassword, newPassword, confirmPassword } = passwords;

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert.error("New password and confirm password do not match");
      return;
    }

    dispatch(updatePassword(passwords));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully");
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
                <PasswordInput Icon={VpnKey} placeholder="Old Password" value={oldPassword} onChange={handleChange} name="oldPassword" />
                <PasswordInput Icon={LockOpen} placeholder="New Password" value={newPassword} onChange={handleChange} name="newPassword" />
                <PasswordInput Icon={Lock} placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} name="confirmPassword" />
                <input type="submit" value="Change" className="updatePasswordBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
