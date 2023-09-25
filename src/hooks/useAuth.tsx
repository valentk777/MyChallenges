import React, { ProviderProps, createContext, useContext, useEffect, useReducer, useState } from 'react'
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
    signIn: (user: LoginUser) => void;
    signOut: (userId: string | null) => void;
}

export const AuthContext = createContext<IAuthorizationContext>({
    state: initialState,
    createUser: (user: LoginUser) => { },
    signIn: (user: LoginUser) => { },
    signOut: (userId: string | null) => { },


    // retrievePersistedAuthUser: () => { },
    // loginWithEmailAndPassword: (user: LoginUser) => { },
    // logout: (user: UserAccount) => { },
    // createAccountWithEmailAndPassword: (user: LoginUser) => { },
    // onVerification: () => { },
});

export interface AppContextProviderProps
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

        // this code will be updated on every 'onAuthStateChanged'. 
        // So we can use this function to check if user should be logged in after closing an app
        function onAuthStateChanged(user) {
            if (user === null) {
                // user is not logged in.
                return;
            }

            state.isLoading = false;
            // NOTE: user != doaminUser
            // const doaminUser = {id: user.uid, email: user.email, isOnline: true } as UserAccount;
            // console.warn(user);
            // console.warn(doaminUser);
            // setUser(user);
          }

        const unsubscribe = authManager?.retrievePersistedAuthUser(onAuthStateChanged);
        // .then(response => {
        //     if (response.isSuccessfull) {
        //         signIn(response.result);
        //         // Keyboard.dismiss();

        //     }
        // })
        // .catch(error => {
        //     console.log(error.message);
        // });

        callLoadAuthStateFromStorage();

        return () => {
            // Unsubscribe from the retrievePersistedAuthUser subscription
            unsubscribe();
        };
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

    const signIn = async (user: LoginUser) => {
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

    // authManager
    //   ?.retrievePersistedAuthUser()
    //   .then(response => {
    //     if (response.isSuccessfull) {
    //       signIn(response.result);
    //       Keyboard.dismiss();
    //     } else {
    //       signOut();
    //     }

    //     setIsLoading(false);
    //   })
    //   .catch(error => {
    //     Alert.alert(error.message);
    //     signOut();
    //   });

    return (
        <AuthContext.Provider
            value={{
                state,
                createUser,
                signIn,
                signOut,
                // signInWithGoogle: authManager.signInWithGoogle,
                // signInWithFacebook: authManager.signInWithFacebook,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)