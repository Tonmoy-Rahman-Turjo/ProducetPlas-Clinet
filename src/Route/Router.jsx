import {
    createBrowserRouter,
    // RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Deshbord from "../Layout/Deshbord/Deshbord";

import User from "../Pages/Deshbord/User/User";

import AddProducts from "../Pages/Deshbord/User/AddProducts/AddProducts";
import MyProducts from "../Pages/Deshbord/User/MyProducts/MyProducts";
import MyProfile from "../Pages/Deshbord/MyProfile/MyProfile";
import Update from "../Pages/Deshbord/User/MyProducts/Update";
import Error from "../Pages/Error";
import ErrorDshabord from "../Pages/ErrorDshabord";
import Payment from "../Pages/Deshbord/Payment/Payment";
import ProductRivew from "../Pages/Deshbord/ProductRivew/ProductRivew";
import RepotsContent from "../Pages/Deshbord/RiporteContes/RepotsContent";
import Detels from "../Shared/Detels/Detels";
import Allrivew from "../Shared/AllRivew/Allrivew";
import StaticPgae from "../Pages/Deshbord/Staticpage.jsx/StaticPgae";
import Managcopun from "./Managcopun";
import EditCoupon from "../UseHook/editcopon";
// import Updatecopon from "../UseHook/Updatecopon";
// import PrivetRoute from "../PrivetRoute/PrivetRoute";
// import AdminRoute from "./AdminRoute";
// import MyProfile from "../Pages/Deshbord/MyProfile/MyProfile";


export  const router = createBrowserRouter([
{
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children:[

        {
            path: '/',
            element:<Home></Home>
        },
        {
            path: "/products",
            element: <Products></Products>
        },
        {
            path: "/login",
            element: <Login></Login>

        },
        {
            path: "/payment",
            element:<Payment></Payment>

        },
        {
            path: "/register",
            element: <Register></Register>
        }
        ,
        {
            path: "/detels/:id",
            element: <Detels></Detels>
        }
    ]
},
{
    path: '/deshbord',
    element: <Deshbord></Deshbord>,
    errorElement: <ErrorDshabord></ErrorDshabord>,
    children:[
        {
            path: '/deshbord/myproducts',
            element: <MyProducts></MyProducts>
        },
       
        {
            path: '/deshbord/addpost',
            element: <AddProducts></AddProducts>
        },{
            path:'/deshbord/myprofile',
            element: <MyProfile></MyProfile>
        },
        // Admin-panel
        {
            path: '/deshbord/user',
            element: <User></User>
        },
        {
            path: '/deshbord/myproduct/update/:id',
            element: <Update></Update>
        },
        {
            path: '/deshbord/staticpage',
            element: <StaticPgae></StaticPgae>

        },
        {
            path: '/deshbord/managcopun',
           element: <Managcopun></Managcopun>

        },
        {
            path: '/deshbord/editcoupon/:id',
            element: <EditCoupon></EditCoupon>

        },
        
        // modaretor-deshbord
        {
            path: '/deshbord/allrivew:id',
            element: <Allrivew></Allrivew>
        },

        {
            path: '/deshbord/repotedcontens',
            element: <RepotsContent></RepotsContent>
        },{
            path: '/deshbord/productrivew',
            element: <ProductRivew></ProductRivew>
        }

    ]
}

])
