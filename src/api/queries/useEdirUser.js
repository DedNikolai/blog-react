import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from '../axios';
import {toast} from 'react-toastify';


export const updatePost = async ({data, postId}) => {
    try {
        const response = await axios.patch(`/posts/${postId}`, data);
        if (response.status === 200) {
            toast.success('POst was updated');
            return response;
           
        } 
    } catch(error) {
        console.log(error)
        toast.error(error.response.data.message);
        return error.response;
    }
}


function useEdirUser({postId}) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ["update post"],
        mutationFn: updatePost,
        onSuccess: (data) => {
            console.log('success');
            queryClient.invalidateQueries({queryKey: ['post', postId]});
 
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const {mutate, isPending} = mutation;
    return {mutate, isUpdating: isPending}
}

export default useEdirUser;