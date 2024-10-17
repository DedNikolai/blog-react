import {createContext, useState} from 'react';

export const AuthContext = createContext(null);

function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    
    return (
        <AuthContext.Provider value={{user, setUser, userLoading, setUserLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;