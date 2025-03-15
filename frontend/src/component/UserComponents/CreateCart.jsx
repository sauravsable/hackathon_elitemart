import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../Loader/Loader";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors,createCart, getCarts} from "../../actions/cartActions";
import { useAlert } from "react-alert";
import MetaData from "../MetaData/MetaData";
import { useNavigate } from "react-router-dom";
import { CREATE_CART_RESET } from "../../constants/cartConstants";

const CreateCart = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isCreated,loading } = useSelector((state) => state.newcart);

  const [cartname, setCartName] = useState("");

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    dispatch(createCart({cartname}));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isCreated) {
        alert.success("Cart Created Successfully");
        navigate("/products");
        dispatch({
          type: CREATE_CART_RESET,
        });
        dispatch(getCarts());
    }
  }, [dispatch, error, alert,isCreated,navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Create Cart" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Create Cart</h2>
              <form className="updateProfileForm" onSubmit={updateProfileSubmit}>
                <div className="updateProfileName">
                  <FaCartPlus />
                  <input type="text" placeholder="Cart Name" required name="name" value={cartname} onChange={(e) => setCartName(e.target.value)}/>
                </div>
                <input type="submit" value="Create" className="updateProfileBtn"/>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateCart;