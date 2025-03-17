const express = require('express');
const {
    registerUser, 
    loginUser, 
    logout, 
    forgetPassword, 
    resetPassword, 
    getUserDetails, 
    updatePassword, 
    updateUserProfile, 
    updateProfileImage,
    getAllUsers, 
    verifyToken} = require('../controller/userController');

const {isAuthenticatedUser} = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post("/register",registerUser);

router.route("/login").post(loginUser);

router.route("/users/:id/verify/:token").get(verifyToken);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser,updatePassword);

router.put("/me/update",isAuthenticatedUser,updateUserProfile);

router.put("/me/updateProfileImage",upload.single('avatar'),isAuthenticatedUser,updateProfileImage);

router.route("/users").get(isAuthenticatedUser,getAllUsers);

module.exports = router;