import { useQuery } from "@tanstack/react-query"
import axios from '../api/axios';
import {toast} from 'react-toastify';

const getPost = async (postId) => {
    try {
        const response = await axios.get(`/posts/${postId}`);
        if (response.status === 200) {
            return response;
        } 
    } catch(error) {
        console.log(error)
        toast.error(error.response.data.message);
        return error.response;
    }

  }

export function usePost(postId) {
    const {data = null, isError, isLoading, isSuccess, isPending} = useQuery({ 
        queryKey: ['post', postId], 
        queryFn: () => getPost(postId),
        select: (data) => data.data,
        enabled: !!postId,
        refetchOnWindowFocus: false,
    })

    return {data, isError, isLoading, isSuccess, isPending}
};