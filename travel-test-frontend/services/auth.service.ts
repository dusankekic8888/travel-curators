import axios from "axios";
import { signIn } from "next-auth/react";

const API_URL = "http://localhost:3333/api/users/";

export const register = ( email: string, password: string) => {
  return axios.post(`${API_URL}signup`, {
    email,
    password,
  });
};

export const login = async (email: string, password: string) => {
  const response = await axios
        .post(`${API_URL}login`, {
            user: {
                email,
                password,
            }
        });
    if (response.data.user.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data.user;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};