import { useAuth } from "@clerk/expo";
import axios from "axios";
import { useEffect } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.5:3000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const useApi = () => {
    const { getToken } = useAuth();
    console.log("💦💦💦💦💦💦");
    console.log(getToken);

    useEffect(() => {
        const interceptor = api.interceptors.request.use(async (config) => {
            const token = await getToken();
            console.log("💦💦💦💦💦💦🍌");
            console.log(token);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });

        // cleanup: remove interceptor when component unmounts
        return () => {
            api.interceptors.request.eject(interceptor);
        };
    }, [getToken]);

    return api
}



// on every single req, we would like have an auth token so that our backend knows that we're authenticated
// we're including the auth token under the auth headers