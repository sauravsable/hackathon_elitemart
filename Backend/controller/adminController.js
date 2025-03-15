const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");

// Create Product -- Admin
exports.createProduct = async (req, res, next) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded." });
  }

  const imagesLinks = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const uploadResult = await uploadToS3(file);

    if (uploadResult.error) {
      console.error("Error uploading file:", uploadResult.error);
      return res.status(500).json({ message: "Failed to upload image." });
    }

    imagesLinks.push({
      key:uploadResult.key,
      url: uploadResult.imageUrl,

    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(201).json({
      success:true,
      product
  });
};