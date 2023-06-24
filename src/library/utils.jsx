import routes from "../config/routes";
import {generatePath} from "react-router-dom";
import {PrivateRoute} from "@components";
import React from "react";

export const url = (path,params = {}) =>{
    let lastRoute = '';
    let url = '';
    path.split('.').map((p)=>{
        if (!lastRoute){
            lastRoute = routes.find(r => r?.name === p);
            url = lastRoute.path;
        }else{
            lastRoute = lastRoute.children.find(r => r?.name === p);
            url += '/' + lastRoute.path;
        }
    })
    return generatePath(url.replace(/\/\//gi,'/'),params);
}


export const authMap = (routes) =>{
    return routes.map(route => {
        if (route?.auth){
            route.element = <PrivateRoute>{route.element}</PrivateRoute>
        }
        if (route?.children){
            route.children = authMap(route.children);
        }

        return route;
    })
}


export const serializeQuery = (params, prefix) => {
    const query = Object.keys(params).map((key) => {
        const value = params[key];

        if (params.constructor === Array) {
            key = `${prefix}[]`;
        } else if (params.constructor === Object) {
            key = prefix ? `${prefix}[${key}]` : key;
        }
        if (typeof value === "object") {
            return serializeQuery(value, key);
        } else {
            return `${key}=${encodeURIComponent(value)}`;
        }
    });
    return [].concat.apply([], query).join("&");
};


export const getCurrentTime = () =>{
    return  new Date().getTime() / 1000;
}


export const isEqual = (first_array = [], second_array = []) => {
    let result = true;
    if (first_array.length && second_array.length) {
        if (first_array.length === second_array.length) {
            first_array.map((item, key) => {
                if (item !== second_array[key]) {
                    result = false;
                }
            });
        } else {
            result = false;
        }
    } else {
        result = false;
    }
    return result;
};
