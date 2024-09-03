import axios, { AxiosInstance } from 'axios';
import { getAuthCookies } from './auth'; // Adjust the path as needed

const http: AxiosInstance = axios.create();

// Add a request interceptor to include the Authorization header with the token from cookies
http.interceptors.request.use((config) => {
    const cookieString = document.cookie; // or however you get your cookies in the current context
    const cookies = getAuthCookies(cookieString); // Pass the cookies directly

    const token = cookies?.access_token;

    if (token) {
        config.headers.access_token = `${token}`;
    }

    return config;
});

export default http;
