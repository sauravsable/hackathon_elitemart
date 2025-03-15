import React from "react";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import './NoProduct.css';

export default function NoProduct({cartName}) {
  return (
    <div className="emptyCart">
      <h2 className="homeheading" style={{ textTransform: "capitalize" }}>
        {cartName}
      </h2>
      <RemoveShoppingCartIcon />
      <Typography>No Product in Your Cart</Typography>
      <Link to="/products">View Products</Link>
    </div>
  );
}
