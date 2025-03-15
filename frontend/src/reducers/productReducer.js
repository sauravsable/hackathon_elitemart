import { 
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS  
} from "../constants/productConstants"

export const productsReducer = (state = { products: []}, action) => {
  switch (action.type) {
      case ALL_PRODUCT_REQUEST:
          return {
              ...state,
              loading: true,
              products: []
          };
      case ALL_PRODUCT_SUCCESS:
          return {
              ...state,
              loading: false,
              products: action.payload.products,
              productsCount: action.payload.productsCount,
              resultPerPage: action.payload.resultPerPage,
              filteredProductCount: action.payload.filteredProductCount
          };
      case ALL_PRODUCT_FAIL:
          return {
              ...state,
              loading: false,
              error: action.payload
          };
      case CLEAR_ERRORS:
          return {
              ...state,
              error: null
          };

      default:
          return state;
  }
};


export const allproductsReducer = (state = { allproducts: []}, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                allproducts: []
            };
        case ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                allproducts: action.payload.allProductsForSearch,
            };
        case ALL_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
  
        default:
            return state;
    }
  };


// Add New Product
export const newProductReducer = ((state = {product : {}},action) =>{
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case NEW_PRODUCT_SUCCESS:
            return{
                loading : false,
                success : action.payload.success,
                product : action.payload.product
            }
        case NEW_PRODUCT_FAIL:
            return{
                loading : false,
                error : action.payload
        }
        case NEW_PRODUCT_RESET:
            return{
                ...state,
                success : false
            }        
        case CLEAR_ERRORS :
            return{
                ...state,
                error : null
        } 
        default:
            return state;
    }
});

export const productDetailReducer = ((state = {product :[]},action) =>{
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading : true,
                ...state
            }
        case PRODUCT_DETAIL_SUCCESS:
            return{
                loading : false,
                product : action.payload.product
            }
        case PRODUCT_DETAIL_FAIL:
            return{
                loading : false,
                error : action.payload
        }        
        case CLEAR_ERRORS :
            return{
                ...state,
                error : null
        } 
        default:
            return state;
    }
});
