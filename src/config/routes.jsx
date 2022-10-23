import React from "react";
import Home from "../pages/home/Home";
import List from "../pages/list/List";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import Single from "../pages/single/Single";
import New from "../pages/new/New";
import {userInputs} from "../formSource";
import ProductView from "../pages/products/views/ProductView";
import AddProduct from "../pages/products/views/AddProduct";
import Products from "../pages/products";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Page404 from "../pages/page404/Page404";
import {authMap} from "../library/utils";



export const MAIN_API_URL = "https://service.ultrafixappliance.com/api/v1";

export const API_ROUTES = {

  authLogin: MAIN_API_URL + "/login",

  usersSearch: MAIN_API_URL + "/users/search",


};


export const MENU_ROUTES = [
  {
    path: "/",
    icon: <i className="symbol feather feather-settings text-info" />,
    name: "home",
    auth: true,
    element: <HomeLayout />,
    children: [
      {
        index:true,
        name:'index',
        auth: true,
        element:<Home />,
      },
      {
        path:'users',
        name:'users',
        children:[
          {
            index:true,
            name:'index',
            auth: true,
            element:<List />,
          },
          {
            path:':userId',
            name:'view',
            auth: true,
            element: <Single />
          },
          {
            path:'new',
            name:'create',
            auth: true,
            element: <New inputs={userInputs} title="Add New User" />
          }
        ]
      },
      {
        path:'products',
        name:'products',
        children:[
          {
            index:true,
            name:'index',
            auth: true,
            element:<Products />,
          },
          {
            path:':productId',
            name:'view',
            auth: true,
            element: <ProductView />
          },
          {
            path:'new',
            name:'create',
            auth: true,
            element: <AddProduct />
          }
        ]
      },
    ]
  },
  {
    path: "/auth",
    icon: <i className="symbol feather feather-settings text-info" />,
    name: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        name: "login",
        element: <Login />
      },
      {
        path: "register",
        name: "register",
        element: <Register />
      },
    ]
  },
  {
    path: '*',
    name: 'notFound',
    element: <Page404 />
  }
];



export default authMap(MENU_ROUTES);
