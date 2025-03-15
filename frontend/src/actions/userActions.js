import axios from 'axios';

import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL, 
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    CLEAR_ERRORS,  
    UPDATE_PROFILEIMAGE_REQUEST,
    UPDATE_PROFILEIMAGE_SUCCESS,
    UPDATE_PROFILEIMAGE_FAIL,
    VERIFY_EMAIL_REQUEST, 
    VERIFY_EMAIL_SUCCESS, 
    VERIFY_EMAIL_FAIL 
} from "../constants/userConstants";

import APIURL from '../API/Api';
const config = {header : {"Content-Type":"application/json"},withCredentials: true} 

//login user
export const login = (email,password)=> async(dispatch)=>{
    try{
        dispatch({type : LOGIN_REQUEST});
        const {data} = await axios.post(`${APIURL}/login`,{email,password},config);
        dispatch({type : LOGIN_SUCCESS, payload  : data})
    }
    catch(error){
        dispatch({type : LOGIN_FAIL, payload : error.response.data.message});
    }
};
  
//register user
export const register = (userData)=> async(dispatch)=>{
    try{
        dispatch({type : REGISTER_USER_REQUEST});
        const {data} = await axios.post(`${APIURL}/register`,userData,config);
        dispatch({type : REGISTER_USER_SUCCESS,payload  : data})
    }
    catch(error){
        dispatch({type : REGISTER_USER_FAIL,payload : error.response.data.message});
    }
};

//load user
export const loadUser = ()=> async(dispatch)=>{
    try{
        dispatch({type : LOAD_USER_REQUEST});
        const {data} = await axios.get(`${APIURL}/me`,config);
        dispatch({type : LOAD_USER_SUCCESS,payload  : data.user})
    }
    catch(error){
        dispatch({type : LOAD_USER_FAIL,payload : error.response.data.message});
    }
};


//load user
export const logout = ()=> async(dispatch)=>{
    try{
       await axios.get(`${APIURL}/logout`,config);
       dispatch({type : LOGOUT_SUCCESS})
    }
    catch(error){
        dispatch({type : LOGOUT_FAIL,payload : error.response.data.message});
    }
};

//update profile
export const updateProfile = (userData)=> async(dispatch)=>{
    try{
        dispatch({type : UPDATE_PROFILE_REQUEST});
        const {data} = await axios.put(`${APIURL}/me/update`,userData,config);
        dispatch({type : UPDATE_PROFILE_SUCCESS,payload  : data.success})
    }
    catch(error){
        dispatch({type : UPDATE_PROFILE_FAIL,payload : error.response.data.message});
    }
};

export const updateProfileImage = (userData)=> async(dispatch)=>{
    try{
        dispatch({type : UPDATE_PROFILEIMAGE_REQUEST});
        const config = { header : {"Content-Type":"multipart/form-data"},withCredentials: true} 
        const {data} = await axios.put(`${APIURL}/me/updateProfileImage`,userData,config);
        dispatch({type : UPDATE_PROFILEIMAGE_SUCCESS,payload  : data.success})
    }
    catch(error){
        dispatch({type : UPDATE_PROFILEIMAGE_FAIL,payload : error.response.data.message});
    }
};

//update password
export const updatePassword = (passwords)=> async(dispatch)=>{
    try{
        dispatch({type : UPDATE_PASSWORD_REQUEST});
        const {data} = await axios.put(`${APIURL}/password/update`,passwords,config);
        dispatch({type : UPDATE_PASSWORD_SUCCESS,payload  : data.success})
    }
    catch(error){
        dispatch({type : UPDATE_PASSWORD_FAIL,payload : error.response.data.message});
    }
};

//forgot password
export const forgotPassword = (email)=> async(dispatch)=>{
    try{
        dispatch({type : FORGET_PASSWORD_REQUEST});
        const {data} = await axios.post(`${APIURL}/password/forgot`,email,config);
        dispatch({type : FORGET_PASSWORD_SUCCESS,payload  : data.message})
    }
    catch(error){
        dispatch({type : FORGET_PASSWORD_FAIL,payload : error.response.data.message});
    }
};

//reset password
export const resetPassword = (token,passwords)=> async(dispatch)=>{
    try{
        dispatch({type : RESET_PASSWORD_REQUEST});
        const {data} = await axios.put(`${APIURL}/password/reset/${token}`,passwords,config); 
        dispatch({type : RESET_PASSWORD_SUCCESS,payload  : data.success})
    }
    catch(error){
        dispatch({type : RESET_PASSWORD_FAIL,payload : error.response.data.message});
    }
};

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`${APIURL}/users`,config);
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};
  
export const verifyEmail = (param) => async (dispatch) => {
    try {
      dispatch({ type: VERIFY_EMAIL_REQUEST });
      const { data } = await axios.get(`${APIURL}/users/${param.id}/verify/${param.token}`);
      dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data.message });
    } catch (error) {
      dispatch({ type: VERIFY_EMAIL_FAIL, payload: error.response.data.message });
    }
};

// clearing Errors
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type : CLEAR_ERRORS})
}