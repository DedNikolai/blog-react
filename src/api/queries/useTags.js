import {useQuery} from '@tanstack/react-query';
import axios from '../axios';
import {useEffect} from 'react';

const fetchTags = async () => {
    try {
        const response = await axios.get('/tags');

        if (response.status === 200) {
            return response.data;
        }
    } catch(error) {
        console.log(error)
    }
}

export function useTags() {
    const {data = [], isPending, isError} = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags
    })

    useEffect(() => {
        if (isError) {
            console.log(isError)
        }
    }, [isError])

    return {data, isPending};
};

