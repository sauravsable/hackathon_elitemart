import React, { useEffect, useState, useRef } from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";

export default function Search() {
  const navigate = useNavigate();
  const { allproducts = [] } = useSelector((state) => state.allProducts);

  const [Keyword, setKeyword] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredResults,setFilteredResults] = useState(allproducts);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (Keyword.trim() === "") {
      setFilteredResults([]);
      setShowResults(false);
      return;
    }

    if (Keyword.trim().length < 2) {
      setFilteredResults([]);
      setShowResults(false);
      return;
    }

    const cachedData = JSON.parse(localStorage.getItem("searchProductCache")) || {};

    if (cachedData[Keyword]) {
      setFilteredResults(cachedData[Keyword]);
      setShowResults(true);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const fuse = new Fuse(allproducts, { keys: ["name"], threshold: 0.4 });
      const result = fuse.search(Keyword).map((res) => res.item);
      cachedData[Keyword] = result;
      localStorage.setItem("searchProductCache", JSON.stringify(cachedData));

      setFilteredResults(result);
      setShowResults(true);
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [Keyword]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (Keyword.trim()) {
      navigate(`/products/${Keyword}`);
      setShowResults(false);
    } else {
      navigate("/products");
    }
  };

  const handleOnClick = (id) => {
    navigate(`/product/${id}`);
    setShowResults(false);
  };

  return (
    <div className="searchDiv">
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input type="text" placeholder="Search a Product" value={Keyword} onChange={(e) => setKeyword(e.target.value)} onFocus={() => setShowResults(true)} onBlur={() => setShowResults(false)}/>
        <input type="submit" value="Search" />
      </form>

      {showResults && filteredResults.length > 0 && (
        <div className="autoSuggest">
          <div className="autoSuggestInner1"></div>
          <div className="autoSuggestInner">
            {filteredResults.map((product) => (
              <span
                className="autoSuggestSpan"
                onMouseDown={() => handleOnClick(product._id)}
                key={product._id}
              >
                {product.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
