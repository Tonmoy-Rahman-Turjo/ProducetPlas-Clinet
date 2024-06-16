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


export  const router = createBrowserRouter([
{
    path: "/",
    element: <Main></Main>,
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
            path: "/register",
            element: <Register></Register>
        }
    ]
},
{
    path: 'deshbord',
    element: <Deshbord></Deshbord>,
    children:[
        {
            path: '/deshbord/myproducts',
            element: <MyProducts></MyProducts>
        },
        {
            path: '/deshbord/user',
            element: <User></User>
        },
        {
            path: '/deshbord/addpost',
            element: <AddProducts></AddProducts>
        },
    ]
}

])
