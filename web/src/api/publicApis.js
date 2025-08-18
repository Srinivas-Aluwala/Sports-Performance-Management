import { QueryClient } from "@tanstack/react-query";
import api from "../util/axiosInstance";


export const queryClient = new QueryClient();

export const fetchEvents = async () => {

    try {
        const { data, status: statusCode } = await api.get('/fetchEvents',
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });

        if (statusCode === 401) {

            const refreshData = await refreshToken();

            if (refreshData.ok) {
                return await logoutRequest();
            }
        }

        if (statusCode === 200 && data) {

            return data;
        }

        return
    } catch (e) {
        throw e;
    }
}
