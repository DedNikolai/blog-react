import {useEffect, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {confirmEmail} from '../api/user';


function Verify() {
    const [isLoading, setIsLoading] = useState(true);
    const [success, setIsSuccess] = useState(false);
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        confirmEmail(id, token).then(res => {
            setIsLoading(false);
            setIsSuccess(true);
        }).finally(() => setIsLoading(false))
    })

    if (isLoading) return <h2>Loading...</h2>

    return (
            success ? <h2>Email Confirmed</h2> : <h2>Confirmation Failed</h2>
    )
}

export default Verify;