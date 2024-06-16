import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import {
  // createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { router } from './Route/Router.jsx';
import Authprovider from './AuthProvider/Authprovider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <Authprovider><RouterProvider router={router} /></Authprovider>
    {/* <App /> */}
  </React.StrictMode>,
)
