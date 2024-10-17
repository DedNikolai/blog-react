import axios from './axios';
import {toast} from 'react-toastify';
import Cookies from "js-cookie";

export const login = async (data) => {
    try {
        const response = await axios.post('/auth/login', data);
        if (response.status === 200) {
            toast.success('Authorization Success!!!');
            Cookies.set("auth-token", response.data.token, { expires: 1 });
            return response.data;
        }

    } catch(error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await axios.get('/auth/me');
        if (response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log(error);
    }
}