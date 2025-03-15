import React, { useState, useEffect, Fragment } from "react";
import "./ResetPassword.css";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
import MetaData from "../MetaData/MetaData";
import { LockOpen, Lock } from "@material-ui/icons";
import { useParams, useNavigate } from "react-router-dom";

const PasswordInput = ({ Icon, placeholder, name, value, onChange }) => (
  <div className="passwordField">
    <Icon />
    <input type="password" placeholder={placeholder} required name={name} value={value} onChange={onChange} />
  </div>
);

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    if (passwords.password !== passwords.confirmPassword) {
      alert.error("Passwords do not match");
      return;
    }

    dispatch(resetPassword(token, passwords));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Password</h2>
              <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                <PasswordInput Icon={LockOpen} placeholder="New Password" name="password" value={passwords.password} onChange={handleChange} />
                <PasswordInput Icon={Lock} placeholder="Confirm Password" name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} />
                <input type="submit" value="Update" className="resetPasswordBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
