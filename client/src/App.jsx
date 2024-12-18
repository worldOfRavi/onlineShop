import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Adminlayout from "./components/admin-view/layout";
import AdminDashboard from "./admin-view/dashboard";
import AdminOrders from "./admin-view/orders";
import AdminProducts from "./admin-view/products";
import AdminFeatures from "./admin-view/features";
import Userlayout from "./components/user-view/layout";
import NotFound from "./pages/not-found";
import UserHome from "./user-view/home";
import UserListing from "./user-view/listing";
import UserAccount from "./user-view/account";
import UserCheckout from "./user-view/checkout";
import UnAuthPage from "./pages/unauth-page";
import CheckAuth from "./components/common/check-auth";

const App = () => {
  const isAuthenticated = false;
  const user = null;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common components */}

      <Routes>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><Adminlayout /></CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="feature" element={<AdminFeatures />} />
        </Route>
        <Route path="user" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><Userlayout /></CheckAuth>}>
          <Route path="home" element={<UserHome />} />
          <Route path="listing" element={<UserListing />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="checkout" element={<UserCheckout />} />
        </Route>
        <Route path="/unauth-page"  element={<UnAuthPage /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
