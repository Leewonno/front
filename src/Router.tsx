import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from "./App";
import Home from './route/home';
import Signin from './route/signin';
import Signup from './route/signup';
import Product from './route/product';
import List from './route/list';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Signin />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "product",
        element: <Product />
      },
      {
        path: "list",
        element: <List />
      }
    ]
  },
]);

export default router;