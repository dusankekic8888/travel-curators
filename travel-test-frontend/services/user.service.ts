import React from "react";
import axios from "axios";
import authHeader from "./auth.header";
import authLocalstorage from "./auth.localStorage";
import { useEffect } from "react";

const API_URL = "http://localhost:3333/api/";
export const getUserBoard = () => {
    return axios.post(API_URL + "users", {
        user:authLocalstorage().user,
        headers: authHeader()
    });
};

// export const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// export const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };