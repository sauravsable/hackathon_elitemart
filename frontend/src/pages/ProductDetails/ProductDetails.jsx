import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { TbShoppingCartShare } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetail } from "../../actions/productActions.js";
import Loader from "../../component/Loader/Loader.jsx";
import { useAlert } from "react-alert";
import MetaData from "../../component/MetaData/MetaData.jsx";
import { addItemsToCart, addProductToCart } from "../../actions/cartActions.js";
import { Rating } from "@material-ui/lab";
import { useParams, useNavigate } from "react-router-dom";
import { ADD_PRODUCT_TO_CART_RESET } from "../../constants/cartConstants.js";

const ProductImageCarousel = ({ images }) => (
  <Carousel className="imageCarousel">
    {images &&
      images.map((item, i) => (
        <img className="CarouselImage" key={i} src={item.url} alt={`Slide ${i}`} />
      ))}
  </Carousel>
);


const QuantitySelector = ({ quantity, setQuantity, stock }) => (
  <div className="detailsBlock-3-1-1">
    <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
    <input readOnly type="number" value={quantity} />
    <button onClick={() => setQuantity((prev) => (prev < stock ? prev + 1 : prev))}>+</button>
  </div>
);

const CartOptions = ({ show, setShow, isAuthenticated, carts, onAddToMyCart, onAddToGroupCart,navigate }) => (
  show && (
    <div className="options-container">
      <IoMdClose className="close-icon" onClick={() => setShow(false)} />
      <h6 style={{ color: "white" }}>Select Cart</h6>
      <button className="option-button" onClick={onAddToMyCart}>
        <TbShoppingCartShare /> My Cart
      </button>
      {isAuthenticated && carts?.length > 0
        ? carts.map((cart) => (
            <button key={cart.id} className="option-button" onClick={() => onAddToGroupCart(cart._id)}>
              <TbShoppingCartShare /> {cart.cartName}
            </button>
          ))
        : <button className="option-button" onClick={() => navigate("/create/Cart")}>Others</button>
      }
    </div>
  )
);

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.newcart);
  const { product, loading, error } = useSelector((state) => state.productDetail);
  const { isAdded, error: productError } = useSelector((state) => state.cartProduct);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
    setShowOptions(false);
  };

  const addProductToCartHandler = (cartId) => {
    dispatch(addProductToCart({ cartId, productId: id, quantity }));
    setShowOptions(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (productError) {
      alert.error(productError);
      dispatch(clearErrors());
    }

    if (isAdded) {
      alert.success("Product Added to Cart Successfully");
      dispatch({ type: ADD_PRODUCT_TO_CART_RESET });
    }

    dispatch(getProductDetail(id));
  }, [dispatch, id, error, alert, productError, isAdded]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- EliteMart`} />
          <div className="ProductDetails">
            <ProductImageCarousel images={product.images} />

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
                  <button className="addtocartbtn" disabled={product.stock < 1} onClick={() => setShowOptions(true)}>
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <CartOptions
                show={showOptions}
                setShow={setShowOptions}
                isAuthenticated={isAuthenticated}
                carts={carts}
                onAddToMyCart={addToCartHandler}
                onAddToGroupCart={addProductToCartHandler}
                navigate={navigate}
              />

              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
