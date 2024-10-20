import {useQuery} from '@tanstack/react-query';
import axios from '../axios';
import {useEffect} from 'react';

const fetchPosts = async () => {
    try {
        const response = await axios.get('/posts');

        if (response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log(error)
    }
}

function usePosts() {
    const {data = [], isPending, isError} = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    })

    useEffect(() => {
        if (isError) {
            console.log(isError)
        }
    }, [isError])

    return {data, isPending};
}

export default usePosts;
