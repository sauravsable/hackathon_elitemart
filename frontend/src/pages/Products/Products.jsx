import React, { useEffect, useState } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../../component/MetaData/MetaData";
import ProductShimmer from "../../component/ShimmerComponents/ProductShimmer";
import Pagination from "../../component/ProductsPagination/ProductsPagination";
import ProductCard from "../../component/ProductCard/ProductCard";

const categories = ["Laptop", "Footwear", "Bottom", "Tops", "Attire", "Camera", "SmartPhones"];

const PriceSlider = ({ price, setPrice }) => (
  <div>
    <Typography>Price</Typography>
    <Slider
      value={price}
      onChange={(e, newPrice) => setPrice(newPrice)}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      min={0}
      max={25000}
    />
  </div>
);

const CategoryList = ({ setCategory }) => (
  <div>
    <Typography>Categories</Typography>
    <ul className="categoryBox">
      {categories.map((categoryItem) => (
        <li key={categoryItem} className="category-link" onClick={() => setCategory(categoryItem)}>
          {categoryItem}
        </li>
      ))}
    </ul>
  </div>
);


const RatingSlider = ({ rating, setRating }) => (
  <fieldset>
    <Typography component="legend">Ratings Above</Typography>
    <Slider
      value={rating}
      onChange={(e, newRating) => setRating(newRating)}
      valueLabelDisplay="auto"
      aria-labelledby="continuous-slider"
      min={0}
      max={5}
    />
  </fieldset>
);

const FilterBox = ({ price, setPrice, setCategory, rating, setRating }) => (
  <div className="filterBox">
    <div className="filterBoxInner">
      <PriceSlider price={price} setPrice={setPrice} />
      <CategoryList setCategory={setCategory} />
      <RatingSlider rating={rating} setRating={setRating} />
    </div>
  </div>
);

const ProductList = ({ products }) => (
  products.length > 0 ? (
    <div className="products">
      {products.map((product) => <ProductCard key={product._id} product={product} />)}
    </div>
  ) : (
    <div className="noProductDiv">
      <h1>No Data Found</h1>
    </div>
  )
);

export default function Products() {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const { products, loading, error, resultPerPage, filteredProductCount } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating, error, alert]);

  return (
    <>
      <MetaData title="Products -- EliteMart" />
      <h2 className="productsHeading">Products</h2>
      <div className="productsDiv">
        <FilterBox price={price} setPrice={setPrice} setCategory={setCategory} rating={rating} setRating={setRating} />
        {loading ? <ProductShimmer /> : <ProductList products={products} />}
      </div>

      {filteredProductCount > resultPerPage && (
        <Pagination pageNo={currentPage} setPageNo={setCurrentPage} totalItems={filteredProductCount} itemsPerPage={resultPerPage} />
      )}
    </>
  );
}
