import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

import {
  allproductsReducer,
  newProductReducer,
  productDetailReducer,
  productsReducer,
} from './reducers/productReducer';

import {
  allUsersReducer,
  forgetpasswordReducer,
  profileReducer,
  userReducer,
  verifyEmailReducer
} from './reducers/userReducer';

import {
  cartReducer,
  newcartReducer,
  invitationReducer,
  addProductToCartReducer,
  removeAllProductFromCartReducer
} from './reducers/cartReducer';

import {
  myOrderReducer,
  newOrderReducer,
  orderDetailReducer,
} from './reducers/orderReducer';

const reducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgetpasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailReducer,
  newProduct: newProductReducer,
  allUsers: allUsersReducer,
  newcart: newcartReducer,
  invitation: invitationReducer,
  cartProduct: addProductToCartReducer,
  allProducts:allproductsReducer,
  removeAllProductsFromCart: removeAllProductFromCartReducer,
  verifyEmail : verifyEmailReducer
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {}
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
