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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
       
       <Authprovider>
       <QueryClientProvider  client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>
       </Authprovider>
      
    {/* <App /> */}
  </React.StrictMode>,
)
