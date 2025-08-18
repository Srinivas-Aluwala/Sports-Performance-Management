

import { QueryClient } from "@tanstack/react-query";
import api from "../util/axiosInstance";
export const queryClient = new QueryClient();



export const createEvent = async (formData) => {

    try {
        const { data, status: statusCode } = await api.post('/createEvent', formData);

            
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