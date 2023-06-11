import React from "react";
import {authMap} from "../library/utils";
import Users from "../pages/Users";
import Page404 from "../pages/ErrorPages/Page404";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import HomeLayout from "../layouts/HomeLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";


export const MAIN_API_URL = "http://127.0.0.1:8000/api/v1";
export const CSRF_TOKEN_URL = "http://127.0.0.1:8000/sanctum/csrf-cookie";

export const API_ROUTES = {

  authLogin: MAIN_API_URL + "/login",
  authRegister: MAIN_API_URL + "/register",
  authLogout: MAIN_API_URL + "/logout",


  usersSearch: MAIN_API_URL + "/users/search",
  users: MAIN_API_URL + "/users",

  //PUBLIC APIS
  serviceList: MAIN_API_URL + "/services/list",
};


export const MENU_ROUTES = [
  {
    path: "/",
    icon: <i className="symbol feather feather-settings text-info" />,
    name: "home",
    auth: true,
    element: <AuthLayout />,
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
        auth: true,
        element:<Users />,
      },


      // {
      //   path:'products',
      //   name:'products',
      //   children:[
      //     {
      //       index:true,
      //       name:'index',
      //       auth: true,
      //       element:<Products />,
      //     },
      //     {
      //       path:':productId',
      //       name:'view',
      //       auth: true,
      //       element: <ProductView />
      //     },
      //     {
      //       path:'new',
      //       name:'create',
      //       auth: true,
      //       element: <AddProduct />
      //     }
      //   ]
      // },
    ]
  },
  {
    path: "/auth",
    icon: <i className="symbol feather feather-settings text-info" />,
    name: "auth",
    element: <HomeLayout />,
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
