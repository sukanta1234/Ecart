axios Instance

import axios from "axios";
import store from "../../store";
import { logout } from "../../store/features/auth";

interface IFaceGlobalResponseType<T> {
    status: number;
    errors?: string[];
    data: T;
}

export type GlobalResponseType<T> = IFaceGlobalResponseType<T>;

const getAccessToken = () => {
    return store.getState().auth.token;
};

const BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();

        if (accessToken) {
            config.headers.Authorization = accessToken;
        }

        return config;
    },
    (error) => {
        // console.log("Inside-request-error", error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status === 403 || response.status === 401) {
            store.dispatch(logout());
        }

        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // console.log("Inside-response-error", error);
        // OR error.response.data.status
        if (error.response.status === 403) {
            originalRequest._retry = true;
            store.dispatch(logout());

            // try {
            //     // const newAccessToken = await refreshAccessToken();
            //     const newAccessToken = getAccessToken();
            //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            //     return axiosInstance(originalRequest);
            // } catch (refreshError) {
            //     // If refresh fails, redirect to login or handle accordingly
            //     console.error("Failed to refresh access token", refreshError);
            //     // clearTokens();
            //     store.dispatch(logout);
            //     // redirect("/login", 401);
            //     return Promise.reject(refreshError);
            // }
        }

        // If it's not a 401 error or the refresh attempt also fails, reject the request
        return Promise.reject(error);
    }
);

export const fetchData = async ({
    url,
    abortSignal,
}: {
    url: string;
    abortSignal?: AbortSignal;
}) => {
    try {
        const response = await axiosInstance.get(url, {
            signal: abortSignal,
        });

        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        // console.error("fetch-error", error);
        return error;
    }
};

interface IFacePostData<T> {
    url: string;
    body: T;
    abortSignal?: AbortSignal;
}

export const postData = async <T>({
    url,
    body,
    abortSignal,
}: IFacePostData<T>) => {
    const response = await axiosInstance.post(url, body, {
        signal: abortSignal,
    });

    return {
        status: response.status,
        data: response.data,
    };
};
export const updateData = async <T>({
    url,
    body,
    abortSignal,
}: IFacePostData<T>) => {
    const response = await axiosInstance.put(url, body, {
        signal: abortSignal,
    });

    return {
        status: response.status,
        data: response.data,
    };
};
