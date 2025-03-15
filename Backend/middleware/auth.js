const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to check the user is authenticated or not
const isAuthenticatedUser = async (req,res,next)=>{
    const {token} = req.cookies;
    
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
};

// Middleware to check whether the user is of specific role
const authorizeRoles = (...roles)=>{
    return (req,res,next) =>{

        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }

        next();
    };
};

module.exports = {isAuthenticatedUser,authorizeRoles};