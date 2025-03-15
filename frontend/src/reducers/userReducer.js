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
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
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
    UPDATE_PROFILEIMAGE_RESET,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAIL
} from "../constants/userConstants"

export const userReducer = ((state = {user :{},message:null},action) =>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading : true,
                isAuthenticated : false,
            }
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return{
              ...state,
              loading : false,
              isAuthenticated : action.payload.isAuthenticated,
              user : action.payload.user,
              message: action.payload.message 
            }    
        case LOGOUT_SUCCESS:
            return {
                loading : false,
                user : null,
                isAuthenticated : false
        }    
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return{
                ...state,
                loading : false,
                isAuthenticated : false,
                user : null,
                message:null,
                error : action.payload
        }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error :action.payload
        }
        case LOAD_USER_FAIL:
            return{
                loading : false,
                isAuthenticated : false,
                user : null,
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

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_REQUEST:
      case UPDATE_PROFILEIMAGE_REQUEST:
      case UPDATE_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_PROFILE_SUCCESS:
      case UPDATE_PROFILEIMAGE_SUCCESS:  
      case UPDATE_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_PROFILE_FAIL:
      case UPDATE_PROFILEIMAGE_FAIL:
      case UPDATE_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_PROFILE_RESET:
      case UPDATE_PROFILEIMAGE_RESET:
      case UPDATE_PASSWORD_RESET:
        return {
          ...state,
          isUpdated: false,
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
  

export const forgetpasswordReducer = ((state = {},action) =>{
    switch (action.type) {
        case FORGET_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
               loading : true,
               error : null
        }
        case FORGET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading : false,
                message : action.payload
        }
        case RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading : false,
                success : action.payload
        }
        case FORGET_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return{
                ...state,
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

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case ALL_USERS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
  
      case ALL_USERS_FAIL:
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
  
  export const verifyEmailReducer = (state = { isVerified : false }, action) => {
    switch (action.type) {
      case VERIFY_EMAIL_REQUEST:
        return {
          ...state,
          loading: true,

        };
      case VERIFY_EMAIL_SUCCESS:
        return {
          ...state,
          loading: false,
          isVerified : true
        };
  
      case VERIFY_EMAIL_FAIL:
        return {
          ...state,
          loading: false,
          isVerified : false,
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


