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
import Company from "../pages/Company";

export const MAIN_API_URL = "http://127.0.0.1:8000/api/v1";
export const CSRF_TOKEN_URL = "http://127.0.0.1:8000/sanctum/csrf-cookie";

export const API_ROUTES = {

  //common apis
  authsettings: MAIN_API_URL + "/authsettings",
  translations: MAIN_API_URL + "/translations",
  mediaUpload: MAIN_API_URL + "/media/store",

  authLogin: MAIN_API_URL + "/login",
  authRegister: MAIN_API_URL + "/register",
  authLogout: MAIN_API_URL + "/logout",


  permissions: MAIN_API_URL + "/permissions",
  parameters: MAIN_API_URL + "/parameters",
  categories: MAIN_API_URL + "/categories",


  settings: MAIN_API_URL + "/settings",
  settingFileUpload: MAIN_API_URL + "/settings/fileupload",
  settingFileDelete: MAIN_API_URL + "/settings/filedelete",

  users: MAIN_API_URL + "/users",
  usersPasswordEdit: MAIN_API_URL + "/users/password/edit",
  userAvatarUpload: MAIN_API_URL + "/users/avatarupload",
  userAvatarDelete: MAIN_API_URL + "/users/avatardelete",

  products: MAIN_API_URL + "/products",
  productFileUpload: MAIN_API_URL + "/products/fileupload",
  productFileDelete: MAIN_API_URL + "/products/filedelete",


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
        path: "company",
        name: "company",
        auth: true,
        element: <Company />,
      },

      {
        name:'moderator',
        path:'moderator',
        children:[
          {
            index:true,
            path:'*',
            name:'index',
            auth: true,
            element:<Users role={1} />,
          },
          {
            path:'edit/:id',
            name:'edit',
            auth: true,
            element: <Info />
          },
        ]
      },

      {
        name:'employee',
        path:'employee',
        children:[
          {
            index:true,
            path:'*',
            name:'index',
            auth: true,
            element:<Users role={2} />,
          },
          {
            path:'edit/:id',
            name:'edit',
            auth: true,
            element: <Info />
          },
        ]
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
            element:<Users role={3} />,
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
