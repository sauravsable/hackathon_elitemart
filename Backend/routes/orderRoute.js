const express = require("express");
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrder } = require("../controller/orderController");

router.route("/order/new").post(isAuthenticatedUser,newOrder);

router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);

router.route("/myorders").get(isAuthenticatedUser,myOrder);


module.exports = router; 