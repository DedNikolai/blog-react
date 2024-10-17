import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:8000',
});

instance.interceptors.request.use(
    config => {
        const authToken = Cookies.get("auth-token");

        if (authToken) {
            config.headers.authorization = `Bearer ${authToken}`;
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },

    error => Promise.reject(error)
)

export default instance;