import {toast} from 'react-toastify';
import axios from './axios';

export const imageUpload = async (data) => {
    try {
        const response = await axios.post('/posts/upload', data);

        if (response.status === 200) {
            toast.success('Upload success!!!');
            return response.data;
        }
    } catch(error) {
        console.log(error);
        toast.error('Upload failed');
    }
};

export const imageRemove = async (path) => {
    try {
        const response = await axios.delete(`/file/remove?path=${path}`);
        if (response.status === 200) {
            toast.success(response.data.message);
            return response;
        }
    } catch(error) {
        console.log(error);
        toast.error('Remove failed');
    }
};