import React, { useEffect, Fragment } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { orderDetails, clearErrors } from "../../actions/orderActions";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const InfoRow = ({ label, value }) => (
  <div>
    <p>{label}:</p>
    <span>{value || "N/A"}</span>
  </div>
);

const StatusBadge = ({ status, successCondition }) => (
  <p className={status === successCondition ? "greenColor" : "redColor"}>
    {status}
  </p>
);

const OrderDetails = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(orderDetails(id));
  }, [dispatch, alert, error, id]);

  if (loading) return <Loader />;

  return (
    <Fragment>
      <MetaData title="Order Details" />
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography component="h1">Order #{order?._id}</Typography>
          <Typography>Shipping Info</Typography>
          <div className="orderDetailsContainerBox">
            <InfoRow label="Name" value={order?.user?.name} />
            <InfoRow label="Phone" value={order?.shippingInfo?.phoneNo} />
            <InfoRow
              label="Address"
              value={
                order?.shippingInfo
                  ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                  : "N/A"
              }
            />
          </div>

          <Typography>Payment</Typography>
          <div className="orderDetailsContainerBox">
            <StatusBadge
              status={order?.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
              successCondition="PAID"
            />
            <InfoRow label="Amount" value={`₹${order?.totalPrice}`} />
          </div>

          {/* Order Status */}
          <Typography>Order Status</Typography>
          <div className="orderDetailsContainerBox">
            <StatusBadge status={order?.orderStatus} successCondition="Delivered" />
          </div>
        </div>

        <div className="orderDetailsCartItems">
          <Typography>Order Items:</Typography>
          <div className="orderDetailsCartItemsContainer">
            {order?.orderItems?.map((item) => (
              <div key={item.product}>
                <img src={item.image} alt="Product" />
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>
                  {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
