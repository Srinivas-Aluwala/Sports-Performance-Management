

import { QueryClient } from "@tanstack/react-query";
import api from "../util/axiosInstance";
import { roleBasedPath } from "../util/constants";
export const queryClient = new QueryClient();



export const createEvent = async (formData) => {

    const basePath = roleBasedPath();

    try {
        const { data, status: statusCode } = await api.post(`${basePath}/createEvent`, formData);

            
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


export const createMeet = async (formData) => {
        console.log("hi");


        const basePath = roleBasedPath();
        console.log(basePath);
        

    try {
        const { data, status: statusCode } = await api.post(`${basePath}/createMeet`, formData);

            
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