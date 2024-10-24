import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../axios';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const fetchPosts = async () => {
    try {
        const response = await axios.get('/posts');

        if (response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log(error)
    }
};

export const createPost = async (data) => {
    try {
        const response = await axios.post('/posts', data)
        if (response.status === 200) {
            toast.success('Post created successfully')
            return response.data;
        }
    } catch(error) {
        toast.error('Cant create post not valid fields');
        console.log(error);
    }
};

function usePosts({cb}) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {data = [], isPending, isError, refetch} = useQuery({
        queryKey: ['posts'], 
        queryFn: fetchPosts,
        refetchInterval: 5000,
        refetchOnWindowFocus: false
    });

    const mutation = useMutation({
        mutationKey: ["create post"],
        mutationFn: createPost,
        onSuccess: (data) => {
            cb(false);
            queryClient.invalidateQueries({queryKey: ['posts'], refetchType: 'all'});
            queryClient.setQueryData(["posts"], (oldData) => {
                return {
                  data: [...oldData, data],
                };
              });
            navigate(`/posts/${data._id}`)  
        },
        onError: (error) => {
            cb(false);
            console.log(error)
        }
    });

    return {data, isPending, mutation};
}

export default usePosts;
