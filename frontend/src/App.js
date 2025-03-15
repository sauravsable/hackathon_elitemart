import React,{useEffect,useState,lazy,Suspense} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import WebFont from "webfontloader";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";

import Header from './component/Header/Header.jsx';
import Footer from './component/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import LoginSignup from './component/UserComponents/LoginSignup.jsx';

import APIURL from './API/Api.js';
import { useDispatch,useSelector } from 'react-redux';
import { loadUser } from './actions/userActions.js';
import { getCarts} from './actions/cartActions.js';
import { getAllProduct } from './actions/productActions.js';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Loader from './component/Loader/Loader.jsx';
import MobileViewHeader from './component/MobileViewHeader/MobileViewHeader.jsx';

import Payment from './component/CartComponents/Payment';
import CreateCart from './component/UserComponents/CreateCart.jsx';
import GroupCartDetails from './component/GroupCartComponents/GroupCartDetails.jsx';

import Cart from './component/CartComponents/Cart.jsx';
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import Product from './pages/ProductDetails/ProductDetails.jsx';
import Products from './pages/Products/Products';

import Profile from './component/UserComponents/Profile.jsx';
import UpdateProfile from './component/UserComponents/UpdateProfile.jsx';
import ForgotPassword from './component/UserComponents/ForgotPassword.jsx';
import ResetPassword from './component/UserComponents/ResetPassword.jsx';
import UpdatePassword from './component/UserComponents/UpdatePassword.jsx';
import AcceptInvitation from './component/UserComponents/AcceptInvitation.jsx';
import VerifyEmail from './component/UserComponents/VerifyEmail.jsx';

const Shipping = lazy(()=> import('./component/CartComponents/Shipping'));
const ConfirmOrder = lazy(()=> import('./component/CartComponents/ConfirmOrder'));
const OrderSuccess = lazy(()=> import('./component/CartComponents/OrderSuccess'));
const MyOrders = lazy(()=> import('./component/OrderComponents/MyOrders.jsx'));
const OrderDetails = lazy(()=> import('./component/OrderComponents/OrderDetails.jsx'));
const NewProduct = lazy(()=> import('./pages/Admin/NewProduct'));

function App() {
  const dispatch = useDispatch();
  const {loading,isAuthenticated,user} = useSelector(state=>state.user);

  const [stripeApiKey, setstripeApiKey] = useState("");

  async function getStripeApiKey (){
    const config = {header : {"Content-Type":"application/json"},withCredentials: true};

    const {data} = await axios.get(`${APIURL}/stripeapikey`,config);
    setstripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loadUser());
    dispatch(getAllProduct());
    
  }, [dispatch]);

  useEffect(() => {
    if(isAuthenticated && isAuthenticated===true){
      getStripeApiKey();
      dispatch(getCarts())
    }
    
  }, [isAuthenticated,dispatch]);

  
  const ProtectedRoute = ({ element, isAdmin}) => {

      if (loading === false && isAuthenticated === false) {
        return <Navigate to = "/login"/> 
      }

      if (isAdmin === true && user && user.role && user.role !== "admin") {
        return <Navigate to = "/login"/> 
      }
  
    return isAuthenticated && element;
  };

  return (
    <Router>
        <Header/>
        <Routes>
           <Route exact path="/" Component={Home}/>
           <Route path='/about' element={<About/>}/>
           <Route path='/contact' element={<Contact/>}/>
           <Route exact path="/login" Component={LoginSignup}/>
           <Route path="/users/:id/verify/:token" element={<VerifyEmail/>} />

           <Route path='/cart' element={<Cart/>}/>

           <Route path='/cart/:id' element={<ProtectedRoute element={<GroupCartDetails/>} />}/>

           <Route path='/products' element={<Products/>}/>
           <Route exact path='/product/:id' element={<Product/>}/>
           <Route path='/products/:keyword' element={<Products/>}/>

           <Route path='/password/forgot' element={<ForgotPassword/>}/>
           <Route path='/password/reset/:token' element={<ResetPassword/>}/>

           <Route path='/accept-invitation' element={<AcceptInvitation/>}/>

           <Route path='/account' element={<ProtectedRoute element={<Profile/>} />}/>
           <Route path="/me/update" element={<ProtectedRoute element={<UpdateProfile/>} />}/>
           <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword/>} />}/>
  
           <Route path='/create/cart' element={<ProtectedRoute element={<CreateCart/>} />}/>

           <Route path='/shipping/:cartId' element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><Shipping/></Suspense>} />}/>
           <Route exact path="/order/confirm/:cartId" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><ConfirmOrder/></Suspense>} />}/>
           
           <Route exact path="/success" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><OrderSuccess/></Suspense>} />}/> 
           <Route exact path="/orders" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><MyOrders/></Suspense>} />}/>
           <Route exact path="/order/:id" element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><OrderDetails/></Suspense>} />}/>


           <Route path={"/admin/product"} element={<ProtectedRoute element={<Suspense fallback={<Loader/>}><NewProduct/></Suspense>} isAdmin={true}/>}/>

          
          {isAuthenticated  && isAuthenticated === true && stripeApiKey && (
          <Route exact path={"/process/payment/:cartId"} element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />
          )}

        </Routes>
       
        <Footer/>
        <MobileViewHeader/>
    </Router>
  
  );
}

export default App;
