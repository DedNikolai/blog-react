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
            return response.data.user;
        }
    } catch(error) {
        console.log(error);
    }
}
export const createUser = async (data) => {
    try {
        const response = await axios.post('/auth/register', data);
        if (response.status === 200) {
            toast.success(response.data.message);
        }
    } catch(error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
}

export const confirmEmail = async (id, token) => {
    try {
        const response = await axios.get(`/auth/verify/${id}?token=${token}`);
        if (response.status === 200) {
            toast.success(response.data.message);
            return response.data;
        }
    } catch(error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
}