import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    CREATE_CART_REQUEST,
    CREATE_CART_SUCCESS,
    CREATE_CART_FAIL,  
    GET_CARTS_REQUEST,
    GET_CARTS_SUCCESS,
    GET_CARTS_FAIL,
    CREATE_CART_RESET,
    CART_DETAILS_REQUEST,
    CART_DETAILS_SUCCESS,
    CART_DETAILS_FAIL,
    CART_INVITATION_REQUEST,
    CLEAR_ERRORS,
    CART_INVITATION_SUCCESS,
    CART_INVITATION_FAIL,
    CART_INVITATION_RESET,
    REMOVE_CART_MEMBER_REQUEST,
    REMOVE_CART_MEMBER_FAIL,
    REMOVE_CART_MEMBER_SUCCESS,
    REMOVE_CART_MEMBER_RESET,
    ADD_PRODUCT_TO_CART_REQUEST,
    ADD_PRODUCT_TO_CART_SUCCESS,
    ADD_PRODUCT_TO_CART_RESET,
    ADD_PRODUCT_TO_CART_FAIL,
    REMOVE_PRODUCT_FROM_CART_REQUEST,
    REMOVE_PRODUCT_FROM__CART_SUCCESS,
    REMOVE_PRODUCT_FROM_CART_RESET,
    REMOVE_PRODUCT_FROM_CART_FAIL,
    ACCEPT_INVITATION_REQUEST,
    ACCEPT_INVITATION_SUCCESS,
    ACCEPT_INVITATION_RESET,
    ACCEPT_INVITATION_FAIL,
    REJECT_INVITATION_REQUEST,
    REJECT_INVITATION_SUCCESS,
    REJECT_INVITATION_RESET,
    REJECT_INVITATION_FAIL,
    REMOVE_CART_REQUEST,
    REMOVE_CART_SUCCESS,
    REMOVE_CART_FAIL,
    REMOVE_CART_RESET,
    REMOVE_ALL_PRODUCTS_FROM_CART_REQUEST,
    REMOVE_ALL_PRODUCTS_FROM_CART_SUCCESS,
    REMOVE_ALL_PRODUCTS_FROM_CART_FAIL 
} from '../constants/cartConstants';

export const cartReducer = ((state = { cartItems :[],shippingInfo:{} },action) =>{
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(
                (i) => i.product === item.product
            );
            
            if(isItemExist){
                return {
                    ...state,
                    cartItems : state.cartItems.map((i)=>
                       i.product === isItemExist.product ? item : i
                    )
                }
            }
            else{
                return{
                    ...state,
                    cartItems : [...state.cartItems,item]
                }
            }
        case REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems : state.cartItems.filter((i) => i.product !== action.payload)
        }

        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo : action.payload
        }

        
        default:
            return state;
    }
});

export const newcartReducer = (state = { carts: [],cartDetails:{} }, action) => {
    switch (action.type) {
      case CREATE_CART_REQUEST:
      case GET_CARTS_REQUEST:
      case CART_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_CART_SUCCESS:
        return {
          ...state,
          loading: false,
          isCreated:action.payload,
        };
      case GET_CARTS_SUCCESS:  
        return {
         ...state,
          loading: false,
          carts:action.payload,
        };
        case CART_DETAILS_SUCCESS:  
        return {
         ...state,
          loading: false,
          cartDetails:action.payload,
        };
      case CREATE_CART_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case GET_CARTS_FAIL:
        return {
          ...state,
          loading: false,
          carts:[],
          error: action.payload,
        };
      case CREATE_CART_RESET:
        return {
          ...state,
          isCreated:false,
        };
      case CART_DETAILS_FAIL:
          return {
          ...state,
          loading: false,
          cartDetails:{},
          error: action.payload,
      };  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
};

  

export const invitationReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_INVITATION_REQUEST:
    case REMOVE_CART_MEMBER_REQUEST:
    case ACCEPT_INVITATION_REQUEST:
    case REJECT_INVITATION_REQUEST: 
      return {
        ...state,
        loading: true,
      };
    case CART_INVITATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isInvited:true,
    };
    case REMOVE_CART_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        isRemoved:true,
    };
    case ACCEPT_INVITATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isAccepted:true,
    };
    case REJECT_INVITATION_SUCCESS:
      return {
        ...state,
        loading: false,
        isRejected:true,
    };
    case CART_INVITATION_RESET:
      return {
        ...state,
        loading: false,
        isInvited:false,
    };
    case REMOVE_CART_MEMBER_RESET:
      return {
        ...state,
        loading: false,
        isRemoved:false,
    };
    case ACCEPT_INVITATION_RESET:
      return {
        ...state,
        loading: false,
        isAccepted:false,
    };
    case REJECT_INVITATION_RESET:
      return {
        ...state,
        loading: false,
        isRejected:false,
    };
    case CART_INVITATION_FAIL:
    case REMOVE_CART_MEMBER_FAIL:
    case ACCEPT_INVITATION_FAIL:
    case REJECT_INVITATION_FAIL:  
      return {
        ...state,
        loading: false,
        error: action.payload,
    };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
    };

    default:
      return state;
  }
};


export const addProductToCartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART_REQUEST: 
    case REMOVE_PRODUCT_FROM_CART_REQUEST:
    case REMOVE_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded:true,
    };
    case REMOVE_PRODUCT_FROM__CART_SUCCESS:
      return {
        ...state,
        loading: false,
        isRemoved:true,
    };
    case REMOVE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        isCartDeleted:true,
    };
    case ADD_PRODUCT_TO_CART_RESET:
      return {
        ...state,
        loading: false,
        isAdded:false,
    };
    case REMOVE_PRODUCT_FROM_CART_RESET:
      return {
        ...state,
        loading: false,
        isRemoved:false,
    };
    case REMOVE_CART_RESET :
      return {
        ...state,
        loading: false,
        isCartDeleted:false,
    };
    case ADD_PRODUCT_TO_CART_FAIL:
    case REMOVE_PRODUCT_FROM_CART_FAIL: 
    case  REMOVE_CART_FAIL:     
      return {
        ...state,
        loading: false,
        error: action.payload,
    };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
    };

    default:
      return state;
  }
};

export const removeAllProductFromCartReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_ALL_PRODUCTS_FROM_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_ALL_PRODUCTS_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
    };
    case REMOVE_ALL_PRODUCTS_FROM_CART_FAIL:
      return {
        ...state,
        loading: false,
    };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
    };

    default:
      return state;
  }
};
