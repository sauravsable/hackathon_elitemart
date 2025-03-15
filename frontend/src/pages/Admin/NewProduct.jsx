import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../component/MetaData/MetaData";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import {
  Spellcheck as SpellcheckIcon,
  AttachMoney as AttachMoneyIcon,
  Description as DescriptionIcon,
  AccountTree as AccountTreeIcon,
  Storage as StorageIcon,
} from "@material-ui/icons";


const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => (
  <div>
    <Icon />
    <input type={type} placeholder={placeholder} required value={value} onChange={onChange} />
  </div>
);


const TextAreaField = ({ icon: Icon, placeholder, value, onChange }) => (
  <div>
    <Icon />
    <textarea placeholder={placeholder} value={value} onChange={onChange} cols="30" rows="1"></textarea>
  </div>
);


const SelectField = ({ icon: Icon, options, onChange }) => (
  <div>
    <Icon />
    <select onChange={onChange}>
      <option value="">Choose Category</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const FileUpload = ({ onChange, imagesPreview }) => (
  <>
    <div id="createProductFormFile">
      <input type="file" accept="image/*" onChange={onChange} multiple />
    </div>
    <div id="createProductFormImage">
      {imagesPreview.map((image, index) => (
        <img key={index} src={image} alt="Product Preview" />
      ))}
    </div>
  </>
);

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0,
  });
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones"];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, alert, error, success, navigate]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      setImages((prev) => [...prev, file]);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(productData).forEach(([key, value]) => formData.set(key, value));
    images.forEach((image) => formData.append("images", image));

    dispatch(createProduct(formData));
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <div className="newProductContainer">
          <form className="createProductForm" encType="multipart/form-data" onSubmit={handleSubmit}>
            <h1>Create Product</h1>

            <InputField icon={SpellcheckIcon} type="text" placeholder="Product Name" value={productData.name} onChange={handleChange} name="name" />
            <InputField icon={AttachMoneyIcon} type="number" placeholder="Price" value={productData.price} onChange={handleChange} name="price" />
            <TextAreaField icon={DescriptionIcon} placeholder="Product Description" value={productData.description} onChange={handleChange} name="description" />
            <SelectField icon={AccountTreeIcon} options={categories} onChange={(e) => setProductData({ ...productData, category: e.target.value })} />
            <InputField icon={StorageIcon} type="number" placeholder="Stock" value={productData.stock} onChange={handleChange} name="stock" />

            <FileUpload onChange={handleImageChange} imagesPreview={imagesPreview} />

            <Button id="createProductBtn" type="submit" disabled={loading}>
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
