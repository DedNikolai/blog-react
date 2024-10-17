import {useContext} from 'react';
import {AuthContext} from '../AuthProvider/AuthProvider';
import {Navigate, useLocation} from 'react-router-dom';

function ProtectedRouter({children}) {
    const location = useLocation();
    const url = new URLSearchParams();
    url.set("redirect", location.pathname + location.search)
    const {user, userLoading} = useContext(AuthContext);
    if (userLoading) return <h2>Loading...</h2>
    return user ? children : <Navigate to={{pathname: '/login', search: url.toString()}} state={{from: location}}/>
}

export default ProtectedRouter;