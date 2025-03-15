import ProductShimmerCard from "./ProductShimmerCard"
export default function ProductShimmer() {
  const shimmerCards = new Array(8).fill(0);
  return (
    <>
     <div className="products">{
          shimmerCards.map((_,index)=>(
            <ProductShimmerCard/>
          ))
        }
      </div> 
    </>
  )
}
