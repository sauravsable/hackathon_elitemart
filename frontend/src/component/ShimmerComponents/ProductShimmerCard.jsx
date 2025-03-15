import { Rating } from "@material-ui/lab";
import './ProductShimmerCard.css';

export default function ProductShimmerCard() {
    const options = {
        value: 0,
        readOnly: true,
        precision: 0.5,
      };
    
  return (
    <>
      <div className="productCard productCardShimmer">
        <div className="imagediv"></div>
        <span className="productCardSpan1"></span>
        <div className="ratingdiv">
          <Rating {...options} />{" "}
          <span className="productCardSpan1">
          </span>
        </div>
        <span className="productCardSpan1"></span>
      </div>
    </>
  );
}
