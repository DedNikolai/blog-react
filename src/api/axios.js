import axios from "axios";
import Cookies from "js-cookie";
import {app} from '../constants';

const instance = axios.create({
    baseURL: app.SERVER_URL,
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