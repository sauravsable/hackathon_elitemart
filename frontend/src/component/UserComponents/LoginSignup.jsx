import React, { useRef, useState, useEffect } from "react";
import "./LoginSignup.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, clearErrors, register } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { MailOutline, LockOpen, Face } from "@material-ui/icons";
import ClipLoader from "react-spinners/ClipLoader";

const InputField = ({ icon: Icon, type, placeholder, name, value, onChange }) => (
  <div className={name}>
    <Icon />
    <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} required />
  </div>
);

export default function LoginSignup() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shipping } = useParams();

  const { error, loading, isAuthenticated, message } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [alert, dispatch, error, isAuthenticated, navigate, shipping, message]);

  const switchTabs = (tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginData.email, loginData.password));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // Object.entries(user).forEach(([key, value]) => formData.set(key, value));
    dispatch(register({name:user.name,email:user.email,password:user.password}));
  };

  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <div>
          <div className="login_signUp_toggle">
            <p className="mb-0" onClick={() => switchTabs("login")}>LOGIN</p>
            <p className="mb-0" onClick={() => switchTabs("register")}>REGISTER</p>
          </div>
          <button ref={switcherTab}></button>
        </div>

        {/* Login Form */}
        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
          <InputField icon={MailOutline} type="email" placeholder="Email" name="email" value={loginData.email} onChange={handleLoginChange} />
          <InputField icon={LockOpen} type="password" placeholder="Password" name="password" value={loginData.password} onChange={handleLoginChange} />
          <Link to="/password/forgot">Forget Password?</Link>
          
          <button type="submit" className="loginBtn" disabled={loading}>
            {loading ? <ClipLoader size={20} color={"#fff"} /> : "Login"}
          </button>
        </form>

        {/* Register Form */}
        <form className="signUpForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
          <InputField icon={Face} type="text" placeholder="Name" name="name" value={user.name} onChange={handleRegisterChange} />
          <InputField icon={MailOutline} type="email" placeholder="Email" name="email" value={user.email} onChange={handleRegisterChange} />
          <InputField icon={LockOpen} type="password" placeholder="Password" name="password" value={user.password} onChange={handleRegisterChange} />
          
          <button type="submit" className="signUpBtn" disabled={loading}>
            {loading ? <ClipLoader size={20} color={"#fff"} /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
