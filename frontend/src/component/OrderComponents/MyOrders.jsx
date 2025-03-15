import React, { useEffect, useMemo, Fragment } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrder } from "../../actions/orderActions";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../MetaData/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const StatusCell = ({ status }) => (
  <span className={status === "Delivered" ? "greenColor" : "redColor"}>
    {status}
  </span>
);

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders = [] } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrder());
  }, [dispatch, alert, error]);

  const rows = useMemo(
    () =>
      orders.map((item) => ({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
      })),
    [orders]
  );

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => <StatusCell status={params.value} />,
    },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.3 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <LaunchIcon />
        </Link>
      ),
    },
  ];

  return (
    <Fragment>
      <MetaData title={`${user?.name || "User"} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{user?.name || "User"}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
