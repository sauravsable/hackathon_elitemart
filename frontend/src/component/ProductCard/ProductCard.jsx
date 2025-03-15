import React from 'react'
import { Rating } from "@material-ui/lab";
import {Link} from 'react-router-dom';
import './productcard.css';

export default function ProductCard({product}) {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "small",  
  };

  return (
   <Link className='productCard' to={`/product/${product._id}`} key={product._id}>
    <img src={product.images[0].url} alt={product.name} />
    <p>{product.name}</p>
    <div>
      <Rating {...options} /> <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
    </div>
    <span>{`₹${product.price}`}</span>
   </Link>
  )
}
