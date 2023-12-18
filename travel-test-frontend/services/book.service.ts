import axios from "axios";

const API_URL = "http://localhost:3333/api/";
import authHeader from "./auth.header";

export const bookedTour = async () => {
    const response = await axios
        .get(`${API_URL}bookings?description=desc`);
    return response.data;
};

export const booking = async (name: string,phone: string,email: string, address: string, tourId: number) => {
  const response = await axios
        .post(`${API_URL}bookings`, {
            booking: {
                customer:{
                    name,
                    phone,
                    email,
                    address
                },
                tourId,
            }
        });
    return response.data;
};