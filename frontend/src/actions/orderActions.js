import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,    
    CLEAR_ERRORS  
}
from '../constants/orderConstants';

import axios from 'axios';
import APIURL from '../API/Api';

const config = {header: {"Content-Type" : "application/json"}, withCredentials : true};

// Create New Order API
// Create new orders
export const createOrder = (order) => async (dispatch)=>{
    try{
        dispatch({type : CREATE_ORDER_REQUEST});
        const {data} = await axios.post(`${APIURL}/order/new`,order,config);
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type : CREATE_ORDER_FAIL,payload : error.response.data.message})
    }  
};

// My Order Action API 
// Returs the users orders 
export const myOrder = () => async (dispatch)=>{
    try{
        dispatch({type : MY_ORDER_REQUEST});
        const {data} = await axios.get(`${APIURL}/myorders`,config);
        dispatch({type:MY_ORDER_SUCCESS,payload:data.orders})
    }
    catch(error){
        dispatch({type : MY_ORDER_FAIL,payload : error.response.data.message})
    }  
};

// Order Detail Action API sending order Id in the params
// Response will be the order detail
export const orderDetails = (id) => async (dispatch)=>{
    try{
        dispatch({type : ORDER_DETAIL_REQUEST});
        const {data} = await axios.get(`${APIURL}/order/${id}`,config);
        dispatch({type:ORDER_DETAIL_SUCCESS,payload:data.order})
    }
    catch(error){
        dispatch({type : ORDER_DETAIL_FAIL,payload : error.response.data.message})
    }  
}

// clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type : CLEAR_ERRORS})
}
