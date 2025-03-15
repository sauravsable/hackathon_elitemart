import axios from 'axios';

import { 
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS  
} from "../constants/productConstants";

import APIURL from '../API/Api';

export const getProduct = (keyword = "",currentPage=1, price=[0,100000],category,rating = 0)=> async(dispatch)=>{
    try{
        dispatch({type : ALL_PRODUCT_REQUEST});
        let link = `${APIURL}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        if(category){
            link = `${APIURL}/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        }
        const {data} = await axios.get(link);
        dispatch({type : ALL_PRODUCT_SUCCESS,payload  : data})
    }
    catch(error){
        dispatch({type : ALL_PRODUCT_FAIL,payload : error.response.data.message});
    }
};

// Create New Product (Admin)
export const createProduct = (productData)=> async(dispatch)=>{
    try{
        dispatch({type : NEW_PRODUCT_REQUEST});
        const config = {header : {"Content-Type":"multipart/form-data"}, withCredentials: true}
        const {data} = await axios.post(`${APIURL}/admin/product/new`,productData,config);
        dispatch({type : NEW_PRODUCT_SUCCESS,payload  : data})
    }
    catch(error){
        dispatch({type : NEW_PRODUCT_FAIL,payload : error.response.data.message});
    }
};


export const getProductDetail = (id)=> async(dispatch)=>{
    try{
        dispatch({type : PRODUCT_DETAIL_REQUEST});
        const {data} = await axios.get(`${APIURL}/product/${id}`);
        dispatch({type : PRODUCT_DETAIL_SUCCESS,payload  : data})
    }
    catch(error){
        dispatch({type : PRODUCT_DETAIL_FAIL,payload : error.response.data.message});
    }
};

export const getAllProduct = ()=> async(dispatch)=>{
    try{
        dispatch({type : ALL_PRODUCTS_REQUEST});
        const {data} = await axios.get(`${APIURL}/allproducts`);
        dispatch({type : ALL_PRODUCTS_SUCCESS,payload  : data})
    }
    catch(error){
        dispatch({type : ALL_PRODUCTS_FAIL,payload : error.response.data.message});
    }
};

// clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type : CLEAR_ERRORS})
}