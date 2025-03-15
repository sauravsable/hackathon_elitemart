import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import ProductCard from "../../component/ProductCard/ProductCard";
import MetaData from "../../component/MetaData/MetaData";
import { getProduct, clearErrors } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import HomeProductShimmer from "../../component/ShimmerComponents/HomeProductShimmer";

export default function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
        <MetaData title="EliteMart" />
        <div className="banner">
          <p>Welcome to EliteMart</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>
          <a href="#productcontainer">
            <button>
              Scroll <CgMouse />
            </button>
          </a>
        </div>

        <h2 className="homeheading">Featured Products</h2>
        {loading ? (
          <HomeProductShimmer />
        ) : (
          <>
            <div className="productcontainer" id="productcontainer">
              {products &&
                products.map((product) => <ProductCard product={product} key={product._id}/>)}
            </div>
          </>
        )}
    </>
  );
}
