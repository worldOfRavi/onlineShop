import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Adminlayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminFeatures from "./pages/admin-view/features";
import Userlayout from "./components/user-view/layout";
import NotFound from "./pages/not-found";
import UserHome from "./pages/user-view/home";
import UserListing from "./pages/user-view/listing";
import UserAccount from "./pages/user-view/account";
import UserCheckout from "./pages/user-view/checkout";
import UnAuthPage from "./pages/unauth-page";
import CheckAuth from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"
import AdminOrdersView from "./pages/admin-view/orders";
import PaypalReturnPage from "./pages/user-view/paypal-return";
import PaymentSuccessPage from "./pages/user-view/payment-success";
import SearchProduct from "./pages/user-view/search-product";

const App = () => {

  const {isAuthenticated, isLoading, user}  = useSelector((state)=>state.authReducer);

  const dispatch = useDispatch();

  useEffect(()=>{
    
    dispatch(authCheck())
  },[dispatch]);

  // console.log(isAuthenticated, isLoading, user);

  if(isLoading) return <div className="w-sceen h-screen flex justify-center items-center">
    <Skeleton className="w-[300px] h-[100px] rounded-full bg-slate-500" />
  </div>

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common components */}

      <Routes>
      {/* <Route path="/" element={<}> 
        <Route path="/auth/login" element={<Login />} />
      </Route> */}
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><Adminlayout /></CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrdersView />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="/user" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><Userlayout /></CheckAuth>}>
          <Route path="home" element={<UserHome />} />
          <Route path="listing" element={<UserListing />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="checkout" element={<UserCheckout />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProduct />} />
        </Route>
        <Route path="/unauth-page"  element={<UnAuthPage /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
