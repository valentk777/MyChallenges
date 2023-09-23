import React, { ProviderProps, createContext, useContext, useState } from 'react'

interface IAuthorizationContext {
    isSignedIn: boolean;
    signIn: () => void;
    authManager: any; //TODO: add actual manager
}

export const AuthContext = createContext<IAuthorizationContext>({
    isSignedIn: false,
    signIn: () => { },
    authManager: null,
});

export interface AppContextProviderProps
    extends Omit<ProviderProps<IAuthorizationContext>, 'value'> {
    authManager: any
}

export const AuthProvider = ({ children, authManager }: AppContextProviderProps) => {
    // move to authManager area
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    const signIn = () => {
        setIsSignedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{
                isSignedIn,
                signIn,
                authManager
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)