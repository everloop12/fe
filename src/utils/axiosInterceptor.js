import axiosInstance from "./axiosInstance";
import { useLoading } from "./loadingContext";

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    const { setLoading } = useLoading();
    setLoading(true)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    const { setLoading } = useLoading();
    setLoading(false)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});