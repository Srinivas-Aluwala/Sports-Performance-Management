

import axios from "axios";
import { baseUrl, TOKEN_EXPIRED, TOKEN_INVALID } from "./constants";
import { logoutRequest, refreshToken } from "../api/authApis";


const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})


api.interceptors.response.use(
    response => response,
    async error => {
        if (error?.response?.status === 401) {

            const type = error?.response?.data?.errorType
        console.log(type)

            if (type === TOKEN_EXPIRED) {

                await refreshToken();

                return api(error.config);
                
            }else if(type === TOKEN_INVALID){

                await logoutRequest();
            }
        }
            return Promise.reject(error);
    }
)
export default api;
