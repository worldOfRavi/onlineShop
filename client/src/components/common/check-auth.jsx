import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  // if the user visit the site for the first time
  // if(location.pathname.includes("http://localhost:5173")){
  //   return <Navigate to={"/auth/login"} />
  // }
  //   if the user is not authenticated and tried to access other page
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to={"/auth/login"} />;
  }

  //   if the user is already logged in but still tried to go to register or login page
  if (
    isAuthenticated &&
    (location.pathname.includes("/register") ||
      location.pathname.includes("/login"))
  ){
    if(user?.role === "admin"){
        return <Navigate to={"/admin/dashboard"} />
    }
    else return <Navigate to={"/user/home"} />
  }

//   if the user if authenticated but tris to access unauthorized pages
if(isAuthenticated && user?.role != 'admin' && location.pathname.includes("admin")){
    return <Navigate to={"/unauth-page"} />
}
// if the user is authenticated as admin but tires to access shopping view

if(isAuthenticated && user?.role === 'admin' && location.pathname.includes("user")){
    return <Navigate to={"/admin/dashboard"} />
} 
    return <>
        {children}
    </>;
};

export default CheckAuth;
