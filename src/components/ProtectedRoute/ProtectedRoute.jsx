import {useContext} from 'react';
import {AuthContext} from '../AuthProvider/AuthProvider';
import {Navigate} from 'react-router-dom';

function ProtectedRouter({children}) {
    const {user} = useContext(AuthContext);
    
    return user ? children : <Navigate to='/login' />
}

export default ProtectedRouter;