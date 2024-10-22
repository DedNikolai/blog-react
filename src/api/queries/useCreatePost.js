import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from '../axios';
import {toast} from 'react-toastify';

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

export function useCreatePost() {
    const queryClient = useQueryClient();
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

    const {mutate} = mutation;
    return mutate;
};
