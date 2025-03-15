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
    CART_DETAILS_SUCCESS,
    CART_DETAILS_REQUEST,
    CART_DETAILS_FAIL,
    CLEAR_ERRORS,
    CART_INVITATION_REQUEST,
    CART_INVITATION_FAIL,
    CART_INVITATION_SUCCESS,
    REMOVE_CART_MEMBER_REQUEST,
    REMOVE_CART_MEMBER_SUCCESS,
    REMOVE_CART_MEMBER_FAIL,
    ADD_PRODUCT_TO_CART_REQUEST,
    ADD_PRODUCT_TO_CART_SUCCESS,
    ADD_PRODUCT_TO_CART_FAIL,
    REMOVE_PRODUCT_FROM_CART_REQUEST,
    REMOVE_PRODUCT_FROM__CART_SUCCESS,
    REMOVE_PRODUCT_FROM_CART_FAIL,
    ACCEPT_INVITATION_REQUEST,
    ACCEPT_INVITATION_SUCCESS,
    ACCEPT_INVITATION_FAIL,
    REJECT_INVITATION_REQUEST,
    REJECT_INVITATION_SUCCESS,
    REJECT_INVITATION_FAIL,
    REMOVE_CART_REQUEST,
    REMOVE_CART_SUCCESS,
    REMOVE_CART_FAIL, 
    REMOVE_ALL_PRODUCTS_FROM_CART_REQUEST,
    REMOVE_ALL_PRODUCTS_FROM_CART_SUCCESS,
    REMOVE_ALL_PRODUCTS_FROM_CART_FAIL
} from '../constants/cartConstants';

import axios from 'axios';
import APIURL from '../API/Api';
const config = {header : {"Content-Type":"application/json"},withCredentials: true} 


//Add to Cart
export const addItemsToCart = (id,quantity)=> async(dispatch,getState)=>{
    const {data} = await axios.get(`${APIURL}/product/${id}`,config);    
    dispatch({
      type :  ADD_TO_CART,
      payload  : {
        product : data.product._id,
        name : data.product.name,
        price : data.product.price,
        image : data.product.images[0].url,
        stock : data.product.stock,
        quantity
      }
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
};

// Remove From Cart
export const removeItemsFromCart = (id)=> async(dispatch,getState)=>{
    dispatch({type :  REMOVE_CART_ITEM,payload : id});
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

// Save Shipping Info
export const saveShippingInfo = (data)=> async(dispatch)=>{
    dispatch({type : SAVE_SHIPPING_INFO,payload : data});
    localStorage.setItem("shippingInfo", JSON.stringify(data))
}

// create cart
export const createCart = ({cartname}) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_CART_REQUEST});
      const { data } = await axios.post(`${APIURL}/create/cart`,{cartname},config);
      dispatch({ type: CREATE_CART_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({type: CREATE_CART_FAIL,payload: error.response.data.message});
    }
};
  
// delete cart
export const deleteCart = ({cartId}) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_REQUEST });
    const { data } = await axios.post(`${APIURL}/removeCart`,{cartId},config);
    dispatch({ type: REMOVE_CART_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({type: REMOVE_CART_FAIL,payload: error.response.data.message,});
  }
};


export const getCarts = () => async (dispatch) => {
try {
  dispatch({ type: GET_CARTS_REQUEST});
  const { data } = await axios.get(`${APIURL}/getcarts`,config);
  dispatch({ type: GET_CARTS_SUCCESS, payload: data.carts });
  }catch (error) {
  dispatch({type: GET_CARTS_FAIL,payload: error.response.data.message});
  }
};

export const getCartDetails = (id) => async (dispatch) => {
try {
  dispatch({ type: CART_DETAILS_REQUEST});
  const { data } = await axios.get(`${APIURL}/getcartDetails/${id}`,config);
  dispatch({ type: CART_DETAILS_SUCCESS, payload: data.cartDetails });
  }catch (error) {
  dispatch({type: CART_DETAILS_FAIL,payload: error.response.data.message,});
  }
};

// create cart invitation
export const cartInvitation = ({cartId,userId,userEmail}) => async (dispatch) => {
    try {
      dispatch({ type: CART_INVITATION_REQUEST});
      const { data } = await axios.post(`${APIURL}/send-cart-invitation`,{cartId,userId,userEmail},config);
      dispatch({ type: CART_INVITATION_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({type: CART_INVITATION_FAIL,payload: error.response.data.message});
    }
};

// accept cart invitation
export const acceptCartInvitation = ({cartId, userId, token }) => async (dispatch) => {
  try {
    dispatch({ type: ACCEPT_INVITATION_REQUEST});
    const { data } = await axios.post(`${APIURL}/accept-invitation`,{cartId,userId,token},config);
    dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({type: ACCEPT_INVITATION_FAIL,payload: error.response.data.message});
  }
};

// reject cart invitation
export const rejectCartInvitation = ({cartId, userId, token }) => async (dispatch) => {
  try {
    dispatch({ type: REJECT_INVITATION_REQUEST});
    const { data } = await axios.post(`${APIURL}/reject-invitation`,{cartId,userId,token},config);
    dispatch({ type: REJECT_INVITATION_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({type: REJECT_INVITATION_FAIL,payload: error.response.data.message});
  }
};

// cart remove member
export const removeCartMember = ({cartId,userId}) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_MEMBER_REQUEST});
    const { data } = await axios.post(`${APIURL}/remove-cart-member`,{cartId,userId},config);
    dispatch({ type: REMOVE_CART_MEMBER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({type: REMOVE_CART_MEMBER_FAIL,payload: error.response.data.message});
  }
};

// add Product to specific cart
export const addProductToCart = ({cartId,productId,quantity}) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_TO_CART_REQUEST});
    const { data } = await axios.post(`${APIURL}/add-product-to-cart`,{cartId,productId,quantity},config);
    dispatch({ type: ADD_PRODUCT_TO_CART_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({type: ADD_PRODUCT_TO_CART_FAIL,payload: error.response.data.message});
  }
};

// remove Product to specific cart
export const removeProductFromCart = ({cartId,productId}) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_PRODUCT_FROM_CART_REQUEST});
    const { data } = await axios.post(`${APIURL}/remove-product-from-cart`,{cartId,productId},config);
    dispatch({ type: REMOVE_PRODUCT_FROM__CART_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({type: REMOVE_PRODUCT_FROM_CART_FAIL,payload: error.response.data.message});
  }
};
  
// remove Product to specific cart
export const removeAllProductsFromCart = (cartId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_ALL_PRODUCTS_FROM_CART_REQUEST});
    const { data } = await axios.post(`${APIURL}/remove-all-products-from-cart`,{cartId},config);
    dispatch({ type: REMOVE_ALL_PRODUCTS_FROM_CART_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({type: REMOVE_ALL_PRODUCTS_FROM_CART_FAIL,payload: error.response.data.message});
  }
};
  

// clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type : CLEAR_ERRORS})
}