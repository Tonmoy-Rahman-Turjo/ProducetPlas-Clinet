/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import Admin from "../UseHook/Admin";
import UseAuth from "../UseHook/UseAuth";


const AdminRoute = ({children}) => {
   const[isAdmin, isAdminlode] = Admin()
   
   const location = useLocation()
   const {lodding,user} =UseAuth
     if(lodding || isAdminlode){
         return <span className="loading  text-center  m-auto loading-spinner loading-lg"></span>
     }
 
   
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
