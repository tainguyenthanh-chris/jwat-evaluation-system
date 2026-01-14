import axios from "axios";
import { API_URL } from "./axios";

const api = axios.create({
    baseURL: `${API_URL}/api/v1`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const logoutApi = async (
    token: string,
    refreshToken: string
) => {
    return api.post("/auth/logout", {
        token,
        refreshToken,
    });
};
