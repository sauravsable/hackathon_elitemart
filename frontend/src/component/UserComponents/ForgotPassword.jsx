import React, { useState, useEffect, Fragment } from "react";
import "./ForgotPassword.css";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userActions";
import { useAlert } from "react-alert";
import MetaData from "../MetaData/MetaData";
import { MailOutline } from "@material-ui/icons";


const TextInput = ({ Icon, type, placeholder, name, value, onChange }) => (
  <div className="inputField">
    <Icon />
    <input type={type} placeholder={placeholder} required name={name} value={value} onChange={onChange} />
  </div>
);

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
                <TextInput Icon={MailOutline} type="email" placeholder="Email" name="email" value={email} onChange={handleChange} />

                <input type="submit" value="Send" className="forgotPasswordBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
