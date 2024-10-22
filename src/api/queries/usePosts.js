import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../axios';
import {useEffect} from 'react';
import {toast} from 'react-toastify';

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
        toast.error(error.response.data.message);
        console.log(error);
    }
};

function usePosts() {
    const queryClient = useQueryClient();

    const {data = [], isPending, isError, refetch} = useQuery({
        queryKey: ['posts'], 
        queryFn: fetchPosts,
        refetchOnWindowFocus: false
    });

    const mutation = useMutation({
        mutationKey: ["create post"],
        mutationFn: createPost,
        onSuccess: (data) => {
            console.log('success');
            queryClient.invalidateQueries({queryKey: ['posts'], refetchType: 'all'});
            queryClient.setQueryData(["posts"], (oldData) => {
                console.log(oldData)
                return {
                  data: [...oldData.data, data],
                };
              });
        },
        onError: (error) => console.log(error)
    });

    useEffect(() => {
        if (isError) {
            console.log(isError)
        }
    }, [isError])

    return {data, isPending, mutation};
}

export default usePosts;
