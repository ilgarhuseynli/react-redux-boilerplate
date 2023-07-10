import React from "react";
import {authMap} from "@lib";
import Users from "../pages/Users";
import Page404 from "../pages/ErrorPages/Page404";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import HomeLayout from "../layouts/HomeLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import {Info} from "../pages/Users/views";


export const MAIN_API_URL = "http://127.0.0.1:8000/api/v1";
export const CSRF_TOKEN_URL = "http://127.0.0.1:8000/sanctum/csrf-cookie";

export const API_ROUTES = {

  //common apis
  settings: MAIN_API_URL + "/settings",
  translations: MAIN_API_URL + "/translations",


  authLogin: MAIN_API_URL + "/login",
  authRegister: MAIN_API_URL + "/register",
  authLogout: MAIN_API_URL + "/logout",


  permissions: MAIN_API_URL + "/permissions",
  parameters: MAIN_API_URL + "/parameters",

  usersSearch: MAIN_API_URL + "/users/search",
  users: MAIN_API_URL + "/users",


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
        name:'users',
        path:'users',
        children:[
          {
            index:true,
            path:'*',
            name:'index',
            auth: true,
            element:<Users />,
          },
          {
            path:'edit/:id',
            name:'edit',
            auth: true,
            element: <Info />
          },
        ]
      },

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
