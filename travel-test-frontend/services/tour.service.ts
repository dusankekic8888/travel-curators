import axios from "axios";

const API_URL = "http://localhost:3333/api/";
import authHeader from "./auth.header";
import authLocalstorage from "./auth.localStorage";
export const tours = async () => {
    const response = await axios
        .get(`${API_URL}tours?description=desc`);
    return response.data;
};

export const createTour = async (title: string, description: string, thumbnail: string) => {
    const response = await axios
        .post(`${API_URL}tours`, {
            tour: {
                title,
                description,
                thumbnail
            },
        },
        {
            headers: authHeader()
        }
        );
    return response.data.user;
};

export const updateTour = async (title: string, description: string, thumbnail: string, id: number) => {
    const response = await axios
        .put(`${API_URL}tours/${id}`, {
            tour: {
                title,
                description,
                thumbnail
            },
        },
        {
            headers: authHeader()
        }
        );
    return response.data.user;
};

export const deleteTour = async (id: number) => {
    const response = await axios
        .delete(`${API_URL}tours/${id}`, {
            headers: authHeader()
        });
    return response.data;
};