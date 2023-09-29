import React, { ProviderProps, createContext, useContext, useEffect, useReducer } from 'react'
import { authManager } from '../external/auth/firebaseAuthManager';
import userService from '../services/userService';
import { Alert } from 'react-native';
import { LoginUser, UserAccount } from '../entities/user';

interface UserState {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: UserAccount | null;
}

const initialState: UserState = {
    isLoading: true,
    isAuthenticated: false,
    user: null,
};

interface IAuthorizationContext {
    state: UserState;
    createUser: (user: LoginUser) => void;
    emailSignIn: (user: LoginUser) => void;
    signOut: (userId: string | null) => void;
    loginOrSignUpWithGoogle: () => void;
    signInAnonymously: () => void;
    // loginOrSignUpWithFacebook: () => void;
}

const AuthContext = createContext<IAuthorizationContext>({
    state: initialState,
    createUser: (user: LoginUser) => { },
    emailSignIn: (user: LoginUser) => { },
    signOut: (userId: string | null) => { },
    loginOrSignUpWithGoogle: () => { },
    signInAnonymously: () => { },
    // loginOrSignUpWithFacebook: () => { },
});

interface AppContextProviderProps
    extends Omit<ProviderProps<IAuthorizationContext>, 'value'> {
}

type UserAction =
    | { type: 'SIGN_IN'; user: UserAccount }
    | { type: 'SIGN_OUT' };

const authReducer = (prevState: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...prevState,
                isAuthenticated: true,
                user: action.user,
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                isAuthenticated: false,
                user: null
            };
        default:
            return prevState;
    }
};

export const AuthProvider = ({ children }: AppContextProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const callLoadAuthStateFromStorage = async () => {
            try {
                const user = await userService.getCurrentUser();

                if (user) {
                    dispatch({ type: 'SIGN_IN', user: user });
                    state.isLoading = false;
                }
            } catch (error) {
                console.error('Error loading authentication state:', error);
            }
        };

        // // this code will be updated on every 'onAuthStateChanged'. 
        // // So we can use this function to check if user should be logged in after closing an app
        // function onAuthStateChanged(user) {
        //     if (user === null) {
        //         state.isLoading = false;
        //         return;
        //     }
        //     state.isLoading = false;
        //     // NOTE: user != doaminUser
        //     // const doaminUser = {id: user.uid, email: user.email, isOnline: true } as UserAccount;
        //     // setUser(user);
        // }
        // const unsubscribe = authManager?.retrievePersistedAuthUser(onAuthStateChanged);
        // return () => {
        //     // Unsubscribe from the retrievePersistedAuthUser subscription
        //     unsubscribe();
        // };

        callLoadAuthStateFromStorage();
    }, []);

    const createUser = async (user: LoginUser) => {
        authManager
            ?.createAccountWithEmailAndPassword(user)
            .then(async response => {
                if (response.isSuccessfull) {
                    const signedInUser = response.result;

                    // do not await
                    userService.updateUser(signedInUser);

                    dispatch({ type: 'SIGN_IN', user: signedInUser });
                } else {
                    console.log(response.error);
                }
            })
            .catch(error => {
                Alert.alert(`Error signing in:', ${error}`);
            });
    }

    const emailSignIn = async (user: LoginUser) => {
        authManager
            ?.loginWithEmailAndPassword(user)
            .then(response => {
                if (response.isSuccessfull) {
                    const signedInUser = response.result as UserAccount;

                    // do not await
                    userService.updateUser(signedInUser);
                    dispatch({ type: 'SIGN_IN', user: signedInUser });
                } else {
                    console.log(response.error);
                }
            })
            .catch(error => {
                Alert.alert(error.message);
            });
    };

    const signOut = async (userId: string | null) => {
        if (userId === null) {
            return;
        }

        try {
            authManager?.logout(userId);

            // do not await
            userService.deleteUser();
            dispatch({ type: 'SIGN_OUT' });
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const loginOrSignUpWithGoogle = async () => {
        authManager
            ?.loginOrSignUpWithGoogle()
            .then(response => {
                if (response.isSuccessfull) {
                    const signedInUser = response.result as UserAccount;

                    // do not await
                    userService.updateUser(signedInUser);
                    dispatch({ type: 'SIGN_IN', user: signedInUser });
                } else {
                    console.log(response.error);
                }
            })
            .catch(error => {
                Alert.alert(error.message);
            });
    }

    const signInAnonymously = async () => {     
        authManager
            ?.signInAnonymously()
            .then(response => {
                if (response.isSuccessfull) {
                    const signedInUser = response.result as UserAccount;

                    // do not await
                    userService.updateUser(signedInUser);
                    dispatch({ type: 'SIGN_IN', user: signedInUser });
                } else {
                    console.log(response.error);
                }
            })
            .catch(error => {
                Alert.alert(error.message);
            });
    }

    // const loginOrSignUpWithFacebook = async () => {
    //     authManager
    //         ?.loginOrSignUpWithFacebook()
    //         .then(response => {
    //             if (response.isSuccessfull) {
    //                 const signedInUser = response.result as UserAccount;
    //                 // do not await
    //                 userService.updateUser(signedInUser);
    //                 dispatch({ type: 'SIGN_IN', user: signedInUser });
    //             } else {
    //                 console.log(response.error);
    //             }
    //         })
    //         .catch(error => {
    //             Alert.alert(error.message);
    //         });
    // }

    //NOTE: DO NOT useMemo here. We WANT to re-render.
    return (
        <AuthContext.Provider
            value={{
                state,
                createUser,
                emailSignIn,
                signOut,
                loginOrSignUpWithGoogle,
                signInAnonymously,
                // loginOrSignUpWithFacebook
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);