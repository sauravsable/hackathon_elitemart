const express = require('express');
const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');

const {createProduct} = require('../controller/adminController')

router.post('/admin/product/new',upload.array('images', 5), isAuthenticatedUser, authorizeRoles("admin"), createProduct);


module.exports = router;