import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import success from "../../assets/success.png";
import "./VerifyEmail.css";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../actions/userActions";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const VerifyEmail = () => {
    const { loading, isVerified, error } = useSelector(state => state.verifyEmail);
	const param = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
		dispatch(verifyEmail(param));
	}, [dispatch, param]);

    useEffect(() => {
        if (isVerified) {
            alert.success("Email Verified");
            navigate("/login");
        } else if (error) {
            alert.error(error);
        }
    }, [isVerified, error, alert, navigate]);

	return (
		<>
			{loading ? (
				<Loader />
			) : isVerified ? (
				<div className="verifyEmailcontainer">
                    <img src={success} alt="success_img" className="success-img" />
                    <h1>Email verified successfully</h1>
                    <Link to="/login">
                        <button className="green-btn">Login</button>
                    </Link>
                </div>
			) : (
                <div className="verifyEmailcontainer">
                    <h1>Verification Failed</h1>
                </div>
			)}
		</>
	);
};

export default VerifyEmail;
